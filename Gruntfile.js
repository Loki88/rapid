module.exports = function(grunt) {

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['watch']);

  grunt.registerTask('build',['concat', 'uglify', 'cssmin']);

  // Project configuration.
  grunt.initConfig({
    dist: 'build',
    filename: 'rapid',
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        src: [
          'modules/rapid.js',
          'modules/transition/transition.js'
        ],
        dest: '<%= dist %>/js/<%= filename %>.js'
      },
      css: {
        src: [
          'css/*.css'
        ],
        dest: '<%= dist %>/css/<%= filename %>.css'
      }
    },
    uglify: {
        dist: {
          src: ['<%= dist %>/js/<%= filename %>.js'],
          dest: '<%= dist %>/js/<%= filename %>.min.js'
        }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/* Rapid CSS */'
        },
        files: {
          '<%= dist %>/css/<%= filename %>.min.css': ['<%= dist %>/css/<%= filename %>.css']
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          debugInfo: false
        }
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      watch: {
        background: true
      },
      continuous: {
        singleRun: true
      },
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['compass']
      },
      javascript: {
        files: ['src/**/*.js'],
        tasks: ['concat:js', 'uglify']
      }
    }
  });


};