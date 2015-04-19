import remote from 'remote';
import ipc from 'ipc';

export default class Bridge {
    downloadFile(fileName, url, dialogTitle) {
        var win = remote.getCurrentWindow(),
            dialog = remote.require('dialog'),
            userHome = ipc.sendSync('get-user-home');

        if (!/\/$/.test(userHome)) {
            userHome += '/';
        }

        dialog.showSaveDialog(win, {
            defaultPath: userHome + fileName,
            title: dialogTitle
        }, function (path) {
            if (!path) {
                // user cancelled
                return;
            }

            var request = remote.require('request'),
                fs = remote.require('fs');

            request(url).pipe(fs.createWriteStream(path));
        });

    }
}