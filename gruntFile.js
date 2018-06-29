module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: {
      dev: {
        NODE_ENV: 'development',
        DEST: 'temp',
        PORT: 8080,
        JWT_SECRET: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
        MONGO_HOST: 'mongodb://localhost/express-mongoose-es6-rest-api-development',
        MONGO_PORT: 27017,
      }
    },
    shell: {
      mongo: {
        command: 'mongod --dbpath=D:data\\db',
        options: {
          async: true
        }
      }
    },
    express: {
      dev: {
        options: {
          script: 'index.js'
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/sass',
          src: ['*.scss'],
          dest: 'public/css',
          ext: '.css'
        }]
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    }
  });
  grunt.loadNpmTasks('grunt-shell-spawn');// this will create non blocking shell command execution, grunt-shell will block other process
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-env');
  grunt.registerTask('dev', ['shell:mongo', 'env', 'express', 'sass', 'watch']);
};
