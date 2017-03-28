var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	connect = require('gulp-connect');

gulp.task('client', function() {
  connect.server({
    root: 'public',
	port:80
  });
});

gulp.task('server', function () {
  nodemon({
    script: 'server.js'
  })
});

gulp.task('default', ['client', 'server']);