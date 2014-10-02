module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Set up the project environment
         * --------------------------------------------------------------------
         */
        paths: {
            src: "src",
            assets: "www/assets",
            grunticons: "<%= paths.assets %>/images/grunticons",
            sass: "<%= paths.src %>/sass",
            css: "<%= paths.assets %>/css"
        },
        watch: {
            sass: {
                options: {
                    nospawn: true,
                    livereload: true
                },
                files: [
                    "<%= paths.sass %>/**/*.scss"
                ],
                tasks: [
                    "css"
                ]
            }
        },
        sass: {
            dev: {
                files: {
                    "<%= paths.css %>/style.css": "<%= paths.sass %>/style.scss"
                },
                options: {
                    sourceComments: 'none',
                    sourceMap: false
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
                    // white, blue, dark-blue, grey, dark-grey, green, orange, red
                    svgColors: ["#ffffff", "#236FA6", "#005685", "#6b6a6a", "#454444", "#59B359", "#FFA217", "#CA4142"],

                    // custom selectors
                    // used for themed icons
                    // customselectors: {
                    //     "route-stop": [".route > .route__item:after"]
                    // },

                    previewhtml: "icons-preview.html",

                    // templates for css output and preview page
                    template: "<%= paths.grunticons %>/template/default-css.hbs"
                    // , previewTemplate:  "<%= paths.grunticons %>/template/preview.hbs"

                }
            }
        },

        autoprefixer: {

            options: {
                map: true,
                browsers: ['> 1%', 'last 2 versions', 'ie >= 8', 'Android 2.3', 'Android 4', 'Firefox >= 4', 'iOS >= 5']
            },

            // prefix the specified file
            main: {
                options: {
                },
                src: '<%= paths.css %>/style.css'
            }
        },

        cssmin: {
            dist: {
                options: {
                    banner: '/* Starter Kit */'
                },
                files: {
                    '<%= paths.css %>/style.css': ['<%= paths.css %>/style.css']
                }
            }

        },

        cmq: {
            options: {
                log: false
            },
            your_target: {
                files: {
                    '<%= paths.css %>/style.css': ['<%= paths.css %>/style.css']
                }
            }
        }

    });

    /**
     * The cool way to load your grunt tasks
     * --------------------------------------------------------------------
     */
    Object.keys( pkg.devDependencies ).forEach( function( dep ){
        if( dep.substring( 0, 6 ) === 'grunt-' ) grunt.loadNpmTasks( dep );
    });

    grunt.registerTask("css", [
        "sass",
        "autoprefixer"
    ]);

    grunt.registerTask("icon", [
        "grunticon_pigment"
    ]);

    grunt.registerTask("dist", [
        "css",
        "cssmin:dist"
    ]);

    grunt.registerTask("all-the-things", [
        "icon",
        "css",
        "cssmin:dist"
    ]);

    grunt.registerTask("all", ["all-the-things"]);

};
