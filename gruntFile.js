'use strict';

let
    path = require('path');

module.exports = function (grunt) {
    
    // collect vendor files from node_modules
    let nm = path.resolve(__dirname, 'node_modules'),
        dom = path.resolve(nm, 'dom/src/dom.js'),
        on = path.resolve(nm, 'on/dist/on.js'),
        vendorAliases = ['dom'],
        sourceMaps = false,
        watch = false,
        watchPort = 35730;
    
    grunt.initConfig({
        
        browserify: {
            // source maps have to be inline.
            // grunt-exorcise promises to do this, but it seems overly complicated
            vendor: {
                // different convention than "main" - this gets the extrenal
                // modules to work properly
                src: ['.'],
                dest: 'dist/vendor.js',
                options: {
                    alias: vendorAliases.map(function (module) {
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
                    // not using browserify watch; it did not trigger a page reload
                    watch: watch,
                    keepAlive: watch,
                    external: vendorAliases,
                    browserifyOptions: {
                        debug: sourceMaps
                    }
                }
            }
        },
        
        less: {
            main: {
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
        
        watch: {
            less: {
                files: ['./styles/*.less'],
                tasks: ['less'],
                options: {
                    // keep from refreshing the whole page
                    // (watch will just reload the stylesheet)
                    livereload: false
                }
            },
            // inert css module is needed for css reload
            css: {
                files: 'dist/styles/main.css'
            },
            scripts: {
                files: ['./browserify/**/*.js'],
                tasks: ['browserify:main']
            },
            // IMPORTANT: this options.livereload will work in the scripts
            // namespace, but then the CSS reload will not work properly
            options: {
                livereload: watchPort
            }
        },
        
        concurrent: {
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