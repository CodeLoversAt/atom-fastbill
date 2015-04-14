"use strict";
var $__app__,
    $__browser_45_window__,
    $__crash_45_reporter__;
var app = ($__app__ = require("app"), $__app__ && $__app__.__esModule && $__app__ || {default: $__app__}).default;
var BrowserWindow = ($__browser_45_window__ = require("browser-window"), $__browser_45_window__ && $__browser_45_window__.__esModule && $__browser_45_window__ || {default: $__browser_45_window__}).default;
var crashReporter = ($__crash_45_reporter__ = require("crash-reporter"), $__crash_45_reporter__ && $__crash_45_reporter__.__esModule && $__crash_45_reporter__ || {default: $__crash_45_reporter__}).default;
(function() {
  'use strict';
  var mainWindow,
      ipc;
  crashReporter.start();
  mainWindow = null;
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
    mainWindow = new BrowserWindow({
      width: size.width * 0.9,
      height: size.height,
      x: x,
      y: y
    });
    mainWindow.loadUrl('file://' + __dirname + '/../index.html');
    mainWindow.on('closed', function() {
      mainWindow = null;
    });
  });
  ipc = require('ipc');
  function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  }
  ipc.on('get-user-home', function(event) {
    event.returnValue = getUserHome();
  });
}());

//# sourceMappingURL=main.js.map