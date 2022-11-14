const { app, BrowserWindow, ipcMain } = require('electron');
const { event } = require('jquery');
const path = require('path');
const { electron } = require('process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 1000,
    frame: false,
    webPreferences: {
      preload: 'preload.js',
      nodeIntegration: true, 
      contextIsolation: false, 
      enableRemoteModule: true
    }
  });
  mainWindow.setMenu(null); //removed the menu bar at the top that wasn't a part of the application

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('quit-app', () => {
  app.quit();
});

//<!--This function will be used to change the alerts for the system and home page-->
//function alerts(){

//syncReadFile('./miscsitefunctions');
//if(){
//var covidswitch = 0;

//  return ;
//}
//}

//<!--This function will be used to change the alerts in the system and on the home page-->
//function alerts(){

//syncReadFile('./miscsitefunctions');
//if(alertswitch == 0){
//  

//  return <img id="alert1" src="images\yellow.svg">;
//}
//else if(alertswitch == 1){
//  return <img id="alert1" src="images\red.svg">;
//}

//else if(alertswitch == 2){
//return <img id="alert1" src="images\green.svg">;
//}
//}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
