'use strict';

let
    path = require('path'),
    externalModules = ['dom'],
    sourceMaps = false,
    watch = false,
    watchPort = 35730;

module.exports = function (grunt) {

   let nm = path.resolve(__dirname, 'node_modules'),
       dom = path.resolve(nm, 'dom/src/dom.js'),
       on = path.resolve(nm, 'on/dist/on.js');

    grunt.initConfig({

        browserify: {
            // source maps have to be inline.
            // grunt-exorcise promises to do this, but it seems overly complicated
            vendor:{
                //files: {
                //    'dist/vendor.js': [dom]
                //},
                src: ['.'],
                dest: 'dist/vendor.js',
                options:{
                    alias: externalModules.map(function(module) {
                        return module + ':';
                    }),
                    external: null,
                    browserifyOptions: {
                        debug: sourceMaps
                    }
                }
            },
            main: {
                files: {
                    'dist/output.js': ['browserify/component.js']
                },
                options: {
                    watch: watch,
                    keepAlive: watch,
                    external: externalModules,
                    browserifyOptions: {
                        debug: sourceMaps
                    }
                }
            }
        },

        less:{
            main:{
                options: {
                    sourceMap: sourceMaps,
                    // path used to link to individual less files in the browser
                    sourceMapBasepath: '/'
                },
                // 'path/to/result.css': 'path/to/source.less'
                files: {
                    'dist/styles/main.css': 'styles/main.less'
                }
            }
        },

        watch:{
            less: {
                files: ['./styles/**/*.less'],
                tasks: ['less'],
                options: {
                    livereload: false //port
                }
            },
            scripts:{
                files: ['./browserify/**/*.js'],
                tasks:['browserify:main'],
                options: {
                    livereload: watchPort
                }
            }
        },

        concurrent:{
            target: {
                tasks: ['watch', 'serve'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.event.on('watch', function (action, filepath) {
        console.log('changed.file', action, filepath);
        //grunt.task.run('browserify:main');
    });

    grunt.event.on('error', function () {
        console.log('------- ERROR', arguments);
    });

    grunt.registerTask('build', function (which) {
        grunt.task.run('browserify:vendor');
        grunt.task.run('browserify:main');
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
};