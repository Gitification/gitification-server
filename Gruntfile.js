'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js', 'controllers/**/*.js', 'helpers/**/*.js', 'db/**/*.js', 'tools/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
			/*
			when used in production
			reload: {
        files: ['public/**', 'views/**'],
        tasks: 'reload'
      },
      */
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
    },
		vows: {
			all: {
				src: ["test/**/*.js"],
				options : {
					reporter : "spec"
				}
			},
		}
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-vows-runner');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);
  grunt.registerTask('travis', ['jshint', 'vows']); // 'nodeunit',
};
