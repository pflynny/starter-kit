
module.exports = function(grunt) {

    var pkg = grunt.file.readJSON( __dirname +'/package.json');
    var path = require('path');

    // Project configuration.
    grunt.initConfig({

        pkg: pkg,

        /**
         * Set up the project environment
         */
        paths: {
            site: '/www',
            assets: '/src',
            javascript: '<%= paths.assets %>/js',
            minifiedJavascript: '<%= paths.javascript %>/dist',
            images: '<%= paths.assets %>/images',
            grunticons: '<%= paths.images %>/grunticons',
            css: '<%= paths.assets %>/css',
            build: 'build',
            sass: '<%= paths.assets %>/sass'
        },

      /**
       * Check Grunt Dependencies
       * --------------------------------------------------------------------
       */
      checkDependencies: {
        this: {
          options: {
            npmInstall: false
          }
        }
      },


        /**
         * Concat
         */
        // concat: {

        //     lib: {
        //         src: [
        //             '<%= paths.javascript %>/lib/browser.js',
        //            '<%= paths.javascript %>/lib/zepto.min.js',
        //             '<%= paths.javascript %>/lib/jquery-1.11.1.min.js',
        //             '<%= paths.javascript %>/lib/quicktube.js',
        //             '<%= paths.javascript %>/lib/snap.svg-min.js',
        //             '<%= paths.javascript %>/lib/fancy-inputs.js',
        //             '<%= paths.javascript %>/lib/show-hide.js',
        //             '<%= paths.javascript %>/lib/analytics.js'
        //         ],
        //         dest: '<%= paths.build %>/js/lib.js'
        //     },

        //     static_mappings: {
        //         src: [
        //             "<%= paths.build %>/js/lib.js",
        //             "<%= paths.build %>/js/site.js"
        //         ],
        //         dest: '<%= paths.minifiedJavascript %>/site.js',
        //         filter: 'isFile'
        //     }

        // },

        /**
         * Let's use some proper module structure for the public site, woohoo!
         * */
        // browserify: {
        //     application: {
        //         files: {
        //             '<%= paths.build %>/js/site.js': [
        //                 '<%= paths.javascript %>/components/**/*.js',
        //                 '<%= paths.javascript %>/site.js'
        //             ]
        //         },
        //     }
        // },

        /**
         * Blast generated CSS and JS files.
         */
        // clean: {

        //     js: [
        //         "<%= paths.minifiedJavascript %>/**/*.js"
        //     ],

        //     build: {
        //         src: ["<%= paths.build %>"]
        //     }

        // },

        /**
         * Minify the production Javascript
         */
        // uglify: {
        //     options: {
        //         banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n",
        //         mangle: {
        //             except: ["jQuery", "Backbone", "SL"]
        //         },
        //         files: [
        //             {
        //                 expand: true,
        //                 flatten: true,   // remove all unnecessary nesting
        //                 src: "<%= paths.minifiedJavascript %>/*.js",  // source files mask
        //                 dest: "<%= paths.minifiedJavascript %>",    // destination folder
        //                 ext: '.min.js'   // replace .js to .min.js
        //             }
        //         ]
        //     },
        //     dev: {
        //         options: {
        //             beautify: true

        //         },
        //         files: "<%= uglify.options.files %>"
        //     },
        //     dist: {
        //         options: {
        //             beautify: false
        //         },
        //         files: "<%= uglify.options.files %>"
        //     }
        // },

        /**
         * Lint the JS and hurt all the feelings!
         */
        // jshint: {
        //     options: {
        //         force: true,
        //         curly: true,
        //         eqeqeq: true,
        //         eqnull: true,
        //         browser: true,
        //         globals: {
        //             jQuery: true
        //         },
        //         // Ignore specific warnings - would be good to fix them instead of ignoring them...testing testing testing.
        //         //'-W061': true,  // Eval can be harmful -
        //         //'-W083': true,   // Don't make functions within a loop
        //         ignores: [
        //             "<%= paths.minifiedJavascript %>/*.js",
        //             "<%= paths.javascript %>/lib/**/*.js",
        //             "/**/*.min.js",
        //             "/**/*.mini.js",
        //             "/**/*_bak.js",
        //             "/**/jquery.js",
        //             "/**/jquery.*.js"
        //         ]
        //     },
        //     all: ['<%= paths.javascript %>/**/*.js']
        // },


        sass: {
            dist: {
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: '<%= paths.assets %>/sass/',      // Src matches are relative to this path.
                        src: ['**/*.scss', "!**/_*.scss"], // Actual pattern(s) to match.
                        dest: '<%= paths.site %>/assets/css/',   // Destination path prefix.
                        ext: '.css'   // Dest filepaths will have this extension.
                    }
                ]
                ,options: {
                    sourceComments: 'none',
                    sourceMap: true
                }
            }
        },


        grunticon_pigment: {

            icons: {

                files: [{
                    cwd: '<%= paths.grunticons %>',
                    dest: '<%= paths.css %>'
                }],

                options: {

                    // colours for svg colourising
                    svgColors: ["#ffffff", "#f9ba30", "#4aa1c5", "#3587a7"],

                    // custom selectors
                    // used for themed icons
                    customselectors: {
                        "upload": [".icon_upload"],
                        "connect-wellington": [".connect-wellington-logo"],
                        "radio_button": [".icon_checkbox--unchecked, .icon_radio--unchecked, .field_checkbox__fancy, .field_radio__fancy"],
                        "radio_button--checked": [".icon_checkbox--checked, .icon_radio--checked, .field_checkbox--checked .field_checkbox__fancy, .field_radio--checked .field_radio__fancy"],
                        "caret-d": [".icon_disclosure"]
                    },

                    previewhtml: "icons.preview.html",

                    // templates for css output and preview page
                    template: "<%= paths.grunticons %>/template/default-css.hbs",
                    previewTemplate:  "<%= paths.grunticons %>/template/preview.hbs"

                }
            }
        },




      /**
         * Watch
         */
        watch: {
            css: {
                files: '<%= paths.assets %>/sass/{,*/}*.scss',
                tasks: ['css'],
                options: {
                    livereload: true,
                    atBegin: true
                }
            },

            j2: {
                files: 'site/templates/**/*.j2',
                tasks: ['noble_gas'],
                options: {
                    livereload: true
                }
            },

            js: {
                files: [
                    "<%= paths.javascript %>/**/*.js",
                    "!<%= paths.javascript %>/dist/*.js"
                ],
                tasks: ['js'],
                options: {
                    livereload: true,
                    atBegin: true
                }
            },

            grunticon: {
                files: ["<%= paths.assets %>/images/svg/**/*.svg"],
                tasks: ["grunticon_pigment"],
                options: {
                    livereload: true
                }
            },

            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    '<%= paths.site %>/*.html',
                    '{.tmp,<%= paths.javascript %>}/{,*/}*.js',
                    '<%= paths.assets %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}'
                ]
            }
        },

        // cssmin: {
        //     pack: {
        //         files: {
        //             '<%= paths.css %>/screen.css': ['<%= paths.css %>/screen.css'],
        //             '<%= paths.css %>/icons-data-png.css': ['<%= paths.css %>/icons-data-png.css'],
        //             '<%= paths.css %>/icons-data-svg.css': ['<%= paths.css %>/icons-data-svg.css'],
        //             '<%= paths.css %>/icons-fallback.css': ['<%= paths.css %>/icons-fallback.css']
        //         }
        //     }
        // }

    });

    // The cool way to load your grunt tasks
    Object.keys( pkg.dependencies ).forEach( function( dep ){
        if( dep.substring( 0, 6 ) === 'grunt-' ) grunt.loadNpmTasks( dep );
    });

    /**
     * Creates a file with all CSS imports
     * --------------------------------------------------------------------
     */
    grunt.registerMultiTask("crawl", "Create a file with all CSS assets", function() {
        var paths = grunt.file.expand( this.data.paths ),
            out = this.data.output,
            contents = "", contentsCss = "", contentsCssImport = "";
        paths.forEach(function( path ) {
            contentsCss += '<link rel="stylesheet" type="text/css" href="' + path + '" />\n';
            contentsCssImport += '@import url("' + path + '");\n';
        });
        contents += contentsCssImport + "\n\n" + contentsCss;
        grunt.file.write( out, contents );
    });

    // Register tasks

    grunt.registerTask("css", [
        "sass",
//        "cssmin"
    ]);

    grunt.registerTask("js", [
//        "clean:js",
        "jshint",
        "concat:lib",
        "browserify",
        "concat:static_mappings",
//        "uglify:dist",
        "clean:build"
    ]);

    grunt.registerTask("images", [
        //"imagemin",
        //"svgmin"
    ]);

    grunt.registerTask("default", [
        "sass",
        "icon",
        "js"
    ]);

    grunt.registerTask("dist", [
        "build",
        "uglify:dist"
    ]);

    grunt.registerTask("build", [
        "checkDependencies",
        "clean",
        "images",
        "sass",
        "icon",
        "js"
    ]);

    grunt.registerTask("noble_gas", function() {
        return true;
    })


    grunt.registerTask("icon", [
      "grunticon_pigment"
    ]);


};

