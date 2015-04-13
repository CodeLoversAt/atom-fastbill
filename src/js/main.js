(function() {
    'use strict';
    var app = require('app'),
        BrowserWindow = require('browser-window'),
        ipc, mainWindow;

    // report crashes
    require('crash-reporter').start();

    // keep global reference of the window object
     mainWindow = null;

    // quit when all windows are closed
    app.on('window-all-closed', function() {
        if (process.platform != 'darwin') {
            app.quit();
        }
    });

    app.on('ready', function() {
        var screen = require('screen'),
            point = screen.getCursorScreenPoint(),
            display = screen.getDisplayNearestPoint(point),
            size = display.workAreaSize,
            x = display.bounds.x + size.width * 0.05,
            y = display.bounds.y;
        console.log('size', size, display, x, y);

        mainWindow = new BrowserWindow({width: size.width * 0.9, height: size.height, x: x, y: y});

        // load index.html
        mainWindow.loadUrl('file://' + __dirname + '/../index.html');

        mainWindow.on('closed', function () {
            mainWindow = null;
        });
    });

    ipc = require('ipc');

    function getUserHome() {
        return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    }

    ipc.on('get-user-home', function (event) {
        event.returnValue = getUserHome();
    });
}());
