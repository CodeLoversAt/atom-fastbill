"use strict";
export default class Storage {
    constructor() {
        if ('object' === typeof chrome && 'object' === typeof chrome.storage) {
            this.store = new ChromeLocalStorage();
        } else {
            this.store = new LocalStorage();
        }
    }

    get(key, cb) {
        this.store.get(key, cb);
    }

    set(key, cb) {
        this.store.set(key, cb);
    }

    remove(key, cb) {
        this.store.remove(key, cb);
    }
}

class ChromeLocalStorage {
    get(key, cb) {
        var result = null;
        try {
            chrome.storage.local.get(key, function (data) {
                if (data && data.hasOwnProperty(key)) {
                    result = data[key];
                }
                cb(result);
            });
        } catch (e) {
            console.warn('error getting storage with key ' + key + ':', e);
            cb(result);
        }
    }

    set(key, value, cb) {
        try {
            var data = {};
            data[key] = value;

            chrome.storage.local.set(data, cb);
        } catch (e) {
            console.warn('error setting storage with key ' + key + ':', e);
            cb();
        }
    }

    remove(key, cb) {
        try {
            chrome.storage.local.remove(key, cb);
        } catch (e) {
            console.warn('error removing storage with key ' + key + ':', e);
            cb();
        }
    }
}

class LocalStorage {
    get(key, cb) {
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
    }

    set(key, value, cb) {
        try {
            localStorage[key] = JSON.stringify(value);
        } catch (e) {
            console.warn('error setting storage key ' + key + ':', e);
        } finally {
            cb();
        }
    }

    remove(key, cb) {
        try {
            delete localStorage[key];
        } catch (e) {
            console.warn('error removing storage with key ' + key + ':', e);
        } finally {
            cb();
        }
    }
}