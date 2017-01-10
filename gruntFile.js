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
                // different convention than "main" - this gets the external
                // modules to work properly
                // Note that vendor does not run through babel - not expecting
                // any transforms. If we were, that should either be built into
                // the app or be another vendor-type file
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
                    'dist/output.js': ['browserify/app.js']
                },
                options: {
                    // not using browserify-watch; it did not trigger a page reload
                    watch: false,
                    keepAlive: false,
                    external: vendorAliases,
                    ///transform:['babelify', {presets: 'latest'}],
                    transform: [["babelify", { "presets": ["latest"] }]],
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

        'http-server': {
            main: {
                // where to serve from (root is least confusing)
                root: '.',
                // port (if you run several projects at once these should all be different)
                port: '9100',
                // host (0.0.0.0 is most versatile: it gives localhost, and it works over an Intranet)
                host: '0.0.0.0',
                cache: -1,
                showDir: true,
                autoIndex: true,
                ext: "html",
                runInBackground: false
                // route requests to another server:
                //proxy: dev.machine:80
            }
        },

        concurrent: {
            target: {
                tasks: ['watch', 'http-server'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    // simple task that builds vendor and dev files
    grunt.registerTask('build', function (which) {
        grunt.task.run('browserify:vendor');
        grunt.task.run('browserify:main');
    });


    // The general task: builds, serves and watches
    grunt.registerTask('dev', function (which) {
        grunt.task.run('build');
        grunt.task.run('less');
        grunt.task.run('concurrent:target');
    });

    // alias for server
    grunt.registerTask('serve', function (which) {
        grunt.task.run('http-server');
    });

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-http-server');
};