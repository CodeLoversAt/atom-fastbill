(function() {
    'use strict';
    var app = require('app');
    var BrowserWindow = require('browser-window');

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

    ipc.on('download-invoice', function (event, data) {
        var target = getUserHome() + '/',
            fs = require('fs'),
            request = require('request'),
            file, suffixNumber = 1;

        function checkFile (fileName) {
            fs.exists(fileName, function (exists) {
                var tmp;
                if (exists) {
                    tmp = target.replace(/\.pdf$/, ' (' + suffixNumber + ').pdf');
                    suffixNumber++;
                    checkFile(tmp);
                } else {
                    file = fs.createWriteStream(fileName);

                    request(data.url).pipe(file);
                }
            });
        }


        fs.exists(target + 'Downloads', function (exists) {
            if (exists) {
                target += 'Downloads/';
            }

            target += data.fileName;

            checkFile(target);
        });

    });
}());
