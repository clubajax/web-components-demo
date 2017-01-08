var path = require('path');

module.exports = function (grunt) {

    grunt.initConfig({

        browserify: {
            dist: {
                files: {
                    'browserify/module.js': ['browserify/component.js']
                },
                options: {}
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
};