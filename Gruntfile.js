module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        'build-atom-shell': {
            tag: 'v0.23.0',
            nodeVersion: '0.23.0',
            buildDir: (process.env.TMPDIR || process.env.TEMP || '/tmp') + '/atom-shell',
            projectName: 'atom-fastbill',
            productName: 'FastBill',
            targetDir: './dist'
        },
        'build-atom-shell-app': {
            options: {
                //platforms: ['darwin', 'win32'],
                atom_shell_version: 'v0.23.0',
                app_dir: './app'
            }
        }
    });

    grunt.loadNpmTasks('grunt-build-atom-shell');
    grunt.loadNpmTasks('grunt-atom-shell-app-builder');

    grunt.registerTask('default', ['build-atom-shell-app']);
};