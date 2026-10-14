const {app,BrowserWindow,protocol,session}=require('electron');
const path=require('node:path'),fs=require('node:fs/promises');
const {staticResponse,isGameURL}=require('./static-server.cjs');
protocol.registerSchemesAsPrivileged([{scheme:'kyara',privileges:{standard:true,secure:true,supportFetchAPI:true}}]);
app.setName('Kyara Solo');
// Stable folder across releases; browser saves can be transferred with JSON import.
app.setPath('userData',path.join(app.getPath('appData'),'KyaraSolo'));
if(process.argv.includes('--software-rendering'))app.disableHardwareAcceleration();
let window;
app.whenReady().then(()=>{
 protocol.handle('kyara',request=>staticResponse(request,app.getAppPath(),fs.readFile));
 session.defaultSession.setPermissionRequestHandler((_webContents,_permission,callback)=>callback(false));
 session.defaultSession.setPermissionCheckHandler(()=>false);
 window=new BrowserWindow({width:1280,height:850,minWidth:390,minHeight:500,backgroundColor:'#0d0c12',title:'Kyara Solo',autoHideMenuBar:true,webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true}});
 window.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 window.webContents.on('will-navigate',(event,url)=>{if(!isGameURL(url))event.preventDefault()});
 window.on('closed',()=>{window=null});
 window.loadURL('kyara://game/index.html');
}).catch(error=>{console.error(error);app.exit(1)});
app.on('window-all-closed',()=>app.quit());
