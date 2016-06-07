var CssFileNamesProvider = require('./grunt_modules/css.js');
var JsFileNamesProvider = require('./grunt_modules/js.js');

module.exports = function(grunt) {

    function getCurrentDirName() {
        var dirs = __dirname.split("\\");
        return dirs[dirs.length - 1];
    };

    grunt.initConfig({
        env : {
            dev : {
                NODE_ENV: 'dev'
            },
            prod: {
                NODE_ENV: 'prod'
            }
        },

        //create index.html with css, js files included
        preprocess: {
            html: {
                options: {
                    context: {
                        includedCss: CssFileNamesProvider.generateCssImportsList(),
                        includedScripts: JsFileNamesProvider.generateJsImportsList()
                    }
                },
                src: 'index_template/IndexHtmlTemplate.html',
                dest: 'index.html'
            }
        },

        //create template.js from template files
        html2js: {
            options: {
                base: '../' + getCurrentDirName(),
                module: 'Templates',
                singleModule: true
            },
            dev: {
                src: ['modules/**/*.html'],
                dest: 'modules/Templates.js'
            }
        },

        //styles processing
        less: {
            dist: {
                files: CssFileNamesProvider.generateCssToLessMap()
            }
        },
        cssmin: {
            prod: {
                files: {
                    'prod/main.css': CssFileNamesProvider.getListOfCssFiles()
                }
            }
        }, 
        clean: {
            css: CssFileNamesProvider.getListOfCssFiles()
        },

        //uglify js files
        uglify: {
            prod: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true
                },
                files: {
                    'prod/main.js': JsFileNamesProvider.getListOfAllJsFiles()
                }
            }
        },

        //watch
        watch: {
            templates: {
                files: ['modules/**/*.html', 'index_template/**/*.html'],
                tasks: ['html2js', 'preprocess']
            },
            gruntModules: {
                files: ['grunt_modules/**/*.js'],
                tasks: ['preprocess']
            },
            less: {
                files: '**/*.less',
                tasks: ['less']
            }
        }
    });



    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //for dev
    grunt.registerTask('default', ['dev', 'watch']);

    grunt.registerTask('dev', ['less', 'html2js', 'env:dev', 'preprocess']);

    //for production
    grunt.registerTask('prod', ['env:prod', 'preprocess', 'less', 'html2js', 'uglify', 'cssmin', 'clean']);    
};