# Scan the actual packaged game without changing antivirus settings.
$ErrorActionPreference = 'Stop'
$target = Join-Path $PWD 'dist/KyaraSolo-win32-x64'
$out = Join-Path $PWD 'dist/security-report'
New-Item -ItemType Directory -Path $out -Force | Out-Null
$files = @(Get-ChildItem -LiteralPath $target -File -Recurse | Where-Object { $_.Extension -in '.exe','.dll','.asar' } | ForEach-Object {
  $signature = if ($_.Extension -ne '.asar') { Get-AuthenticodeSignature -LiteralPath $_.FullName } else { $null }
  @{ path=$_.FullName.Substring($target.Length + 1); sha256=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash; signature=if ($signature) { $signature.Status.ToString() } else { 'Not applicable' }; signer=if ($signature.SignerCertificate) { $signature.SignerCertificate.Subject } else { $null } }
})
$report = @{ createdAt=(Get-Date).ToUniversalTime().ToString('o'); commit=$env:GITHUB_SHA; files=$files; antivirus=@{ status='unavailable'; reason=$null }; chromeBlockingResolved=$false }
$clean = $false
try {
  $status = Get-MpComputerStatus
  $report.antivirus.initialStatus = @{ enabled=$status.AntivirusEnabled; service=$status.AMServiceEnabled; signatures=$status.AntivirusSignatureVersion; updated=$status.AntivirusSignatureLastUpdated }
  if (-not $status.AntivirusEnabled -or -not $status.AMServiceEnabled) { throw 'Microsoft Defender is not active on this hosted runner; no scan claimed.' }
  Update-MpSignature
  $started = Get-Date
  $platform = Join-Path $env:ProgramData 'Microsoft/Windows Defender/Platform'
  $scanner = Get-ChildItem -Path (Join-Path $platform '*/MpCmdRun.exe') -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
  $command = if ($scanner) { $scanner.FullName } else { Join-Path $env:ProgramFiles 'Windows Defender/MpCmdRun.exe' }
  if (-not (Test-Path -LiteralPath $command)) { throw 'Official Defender command-line scanner unavailable.' }
  & $command -Scan -ScanType 3 -File $target *> (Join-Path $out 'defender-scan.log')
  $scanExit = $LASTEXITCODE
  $report.antivirus.scanExitCode = $scanExit
  $detections = @(Get-MpThreatDetection | Where-Object { $_.InitialDetectionTime -ge $started.AddSeconds(-5) -or ($_.Resources -join ' ') -like "*$target*" })
  $report.antivirus.detections = @($detections | Select-Object ThreatID,InitialDetectionTime,ActionSuccess,Resources)
  $report.antivirus.finalSignatures = (Get-MpComputerStatus).AntivirusSignatureVersion
  if ($detections.Count -gt 0) { $report.antivirus.status='detected' } elseif ($scanExit -eq 0) { $report.antivirus.status='no_detection'; $clean=$true } else { throw "Scanner exit $scanExit: scan could not be confirmed clean; inspect defender-scan.log." }
} catch { $report.antivirus.reason=$_.Exception.Message }
$report | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $out 'scan.json') -Encoding utf8
"clean=$($clean.ToString().ToLowerInvariant())" | Out-File -FilePath $env:GITHUB_OUTPUT -Append -Encoding utf8
$appExe = $files | Where-Object { $_.path -eq 'KyaraSolo.exe' } | Select-Object -First 1
Write-Host "::notice title=Packaged executable signature::$($appExe.signature); SHA256 $($appExe.sha256)"
Write-Host "::notice title=Antivirus verification::$($report.antivirus.status); $($report.antivirus.reason)"
Write-Host "Antivirus result: $($report.antivirus.status). $($report.antivirus.reason)"
if ($report.antivirus.status -eq 'detected') { Write-Host "::error title=Defender detection::Threat IDs $($detections.ThreatID -join ', '); resources $($detections.Resources -join '; ')"; throw 'Antivirus detection: Windows executable upload blocked.' }
