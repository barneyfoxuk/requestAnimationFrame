/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        /* Below here is where you edit: */
        concat: {
            lib: {
                //array of paths to library js files you are using
                src: [
                    'components/lib/jquery/jquery-1.8.2.js'
                ],
                dest: 'js/lib.js'
            },
            polyfills: {
                //array of paths to polyfill js files you are using
                src: [
                    'components/polyfills/console.log.js'
                    //'components/polyfills/ie7.Array.indexOf.js',
                    //'components/polyfills/jquery.cssHooks.backgroundPosition.js'
                ],
                dest: 'js/polyfills.js'
            },
            ext: {
                //array of paths to extension (i.e. plugins) js files you are using
                src: [

                ],
                dest: 'js/ext.js'
            },
            app: {
                src: [
                    'js/app/*.js'
                ],
                dest: 'js/app.js'
            }
        },


        /* you shouldn't need to edit below here */

        jshint: {
            all: ['Gruntfile.js', 'js/app/*.js']
        },


        uglify: {
            lib: {
                src: ['js/lib.js'],
                dest: 'js/lib.min.js'
            },
            polyfills: {
                src: ['js/polyfills.js'],
                dest: 'js/polyfills.min.js'
            },
            ext: {
                src: ['js/ext.js'],
                dest: 'js/ext.min.js'
            },
            app: {
                src: ['js/app.js'],
                dest: 'js/app.min.js'
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: 'css/scss',
                    cssDir: 'css'
                }
            },
            dist: {
                options: {
                    sassDir: 'css/scss',
                    cssDir: 'css',
                    environment: 'production'
                }
            }
        },

        watch: {
            js: {
                files: ['grunt.js', 'js/app/**/*js', 'components/**/*js'],
                tasks: ['jshint', 'concat']
            },
            compass: {
                files: ['css/**/*.scss'],
                tasks: ['compass:dev']
            }
        }

    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'concat', 'compass:dev']);
    grunt.registerTask('dist', ['jshint', 'concat', 'compass:dev', 'uglify']);

    // Build distribution version
    //grunt.registerTask('deploy', 'concat lint min compass:dist');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

};
