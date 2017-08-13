const {app, BrowserWindow} = require('electron');
const ipcMain = require('electron').ipcMain;

app.on('ready', ()=>{
    var mainWindow = new BrowserWindow({show:false, frame:false});
    mainWindow.loadURL('file://'+__dirname+'/index.html');
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
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

