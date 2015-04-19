"use strict";
"use strict";
var Storage = (function() {
  function Storage() {
    if ('object' === typeof chrome && 'object' === typeof chrome.storage) {
      this.store = new ChromeLocalStorage();
    } else {
      this.store = new LocalStorage();
    }
  }
  return ($traceurRuntime.createClass)(Storage, {
    get: function(key, cb) {
      this.store.get(key, cb);
    },
    set: function(key, cb) {
      this.store.set(key, cb);
    },
    remove: function(key, cb) {
      this.store.remove(key, cb);
    }
  }, {});
}());
var $__default = Storage;
var ChromeLocalStorage = (function() {
  function ChromeLocalStorage() {}
  return ($traceurRuntime.createClass)(ChromeLocalStorage, {
    get: function(key, cb) {
      var result = null;
      try {
        chrome.storage.local.get(key, function(data) {
          if (data && data.hasOwnProperty(key)) {
            result = data[key];
          }
          cb(result);
        });
      } catch (e) {
        console.warn('error getting storage with key ' + key + ':', e);
        cb(result);
      }
    },
    set: function(key, value, cb) {
      try {
        var data = {};
        data[key] = value;
        chrome.storage.local.set(data, cb);
      } catch (e) {
        console.warn('error setting storage with key ' + key + ':', e);
        cb();
      }
    },
    remove: function(key, cb) {
      try {
        chrome.storage.local.remove(key, cb);
      } catch (e) {
        console.warn('error removing storage with key ' + key + ':', e);
        cb();
      }
    }
  }, {});
}());
var LocalStorage = (function() {
  function LocalStorage() {}
  return ($traceurRuntime.createClass)(LocalStorage, {
    get: function(key, cb) {
      var result = null;
      try {
        var serialized = localStorage[key];
        if (serialized) {
          result = JSON.parse(serialized);
        }
      } catch (e) {
        console.warn('error getting storage key ' + key + ':', e);
        cb(null);
      } finally {
        cb(result);
      }
    },
    set: function(key, value, cb) {
      try {
        localStorage[key] = JSON.stringify(value);
      } catch (e) {
        console.warn('error setting storage key ' + key + ':', e);
      } finally {
        cb();
      }
    },
    remove: function(key, cb) {
      try {
        delete localStorage[key];
      } catch (e) {
        console.warn('error removing storage with key ' + key + ':', e);
      } finally {
        cb();
      }
    }
  }, {});
}());
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../../js/service/storage.js.map