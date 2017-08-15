const {app, BrowserWindow} = require('electron');
const ipcMain = require('electron').ipcMain;

app.on('ready', ()=>{
    var mainWindow = new BrowserWindow({
        show:false, 
        frame:false,
        height:650,
        minHeight:650,});
    mainWindow.loadURL('file://'+__dirname+'/index.html');
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.webContents.openDevTools({mode:"undocked"});
    });

    ipcMain.on('close-btn-click',()=>{
        mainWindow.close();
    });
    ipcMain.on('max-btn-click',()=>{
        mainWindow.maximize();
    });
    ipcMain.on('min-btn-click',()=>{
        mainWindow.minimize();
    });
});

