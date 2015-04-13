module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        'build-atom-shell': {
            tag: 'v0.23.0',
            nodeVersion: '0.23.0',
            buildDir: (process.env.TMPDIR || process.env.TEMP || '/tmp') + '/atom-shell',
            projectName: 'atom-fastbill',
            productName: 'FastBill',
            targetDir: './'
        }
    });

    grunt.loadNpmTasks('grunt-build-atom-shell');

    grunt.registerTask('default', ['build-atom-shell']);
};