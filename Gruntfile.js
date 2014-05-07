module.exports = function(grunt){

    // 项目配置
    //grunt.file.defaultEncoding = 'gbk';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
         assetsPath: 'assets',
        //合并任务
        concat: {
            options: {
                beautify: {
                    ascii_only: true
                },
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            "jsCombo": {
                src: ['lib/*.js','src/*.js'],
                dest: 'build/app.debug.js'
            },
            "cssCombo": {
                src: ['assets/css/stylesheets/app.css'],
                dest: 'build/index.css'
            }
        },

        //压缩任务
        uglify:{
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                beautify: {
                    ascii_only: true
                }
            },
            "jsCombo":{
                    files:{"<%= concat.jsCombo.dest  %>":['<%= concat.jsCombo.dest  %>']}
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: '<%= assetsPath %>/css/sass/',
                    cssDir: '<%= assetsPath %>/css/stylesheets/',                    
                    config: '<%= assetsPath %>/css/config.rb'
                }
            }
        },

        cssmin: {
            options: {
                chatset:"gbk",
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            main: {
                files: {
                  "<%= concat.cssCombo.dest  %>":['<%= concat.cssCombo.src  %>']
                }
            } 
        },
        watch: {
            "js":{
                files: ["<%= concat.jsCombo.src  %>"],
                tasks: ['concat:jsCombo']
            },
            "css":{
                files: ["<%= assetsPath %>/css/*/*.scss"],
                tasks: ['compass:dist','concat:cssCombo']
            },
            
            "livereload": {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'demo/*.html',
                    'build/*.{css,js}'
                ]
            }
        },
        
        
        imagemin: {                   
            dynamic: {                       // Another target
              files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'assets/slice/',                   // Src matches are relative to this path
                src: ['**/*.{png,gif}'],   // Actual patterns to match
                dest: 'assets/slice-min/'                  // Destination path prefix
              }]
            }
          },
  
         
        connect:{
            
            options: {
                port: 9000,
                livereload: 35729,
                hostname: '0.0.0.0'
            },
            
            livereload: {
                options: {
                    open: true,
                    base: [
                        ''
                    ]
                }
            }
        }

    });

    // 加载提供"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    //合并插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    
    grunt.loadNpmTasks('grunt-contrib-compass');

    //合并插件
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.loadNpmTasks('grunt-contrib-connect');
    
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    
    //上线 grunt 
    grunt.registerTask('dist', ['concat','uglify','cssmin']);
    
    //windows 上这个任务有些问题
    grunt.registerTask('image',['imagemin']);

    grunt.registerTask('dist',['uglify:jsCombo','uglify:jsCombo']);
    //开发 grunt dev
    grunt.registerTask('dev', ['connect:livereload','concat','watch']);
}