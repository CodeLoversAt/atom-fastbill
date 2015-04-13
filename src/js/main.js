(function() {
    'use strict';
    var app = require('app'),
        BrowserWindow = require('browser-window');

    // report crashes
    require('crash-reporter').start();

    // keep global reference of the window object
    var mainWindow = null;

    // quit when all windows are closed
    app.on('window-all-closed', function() {
        if (process.platform != 'darwin') {
            app.quit();
        }
    });

    app.on('ready', function() {
        mainWindow = new BrowserWindow({width: 1000, height: 800});

        // load index.html
        mainWindow.loadUrl('file://' + __dirname + '/../index.html');

        mainWindow.on('closed', function() {
            mainWindow = null;
        });
    });

    var ipc = require('ipc');

    function getUserHome() {
        return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    }

    ipc.on('get-user-home', function (event) {
        event.returnValue = getUserHome();
    });
}());
