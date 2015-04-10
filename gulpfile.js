'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var dir = {
  dev: 'public/',
  prod: 'publish/',
  src: 'client/'
};

gulp.task('browserify', function() {
  var destination = (util.env.production ? dir.prod : dir.dev) + 'js/';

  // create new bundle
  var b = browserify();
  b.transform(reactify);
  b.add('./' + dir.src + 'js/app.js');

  return b.bundle()
    .on('error', function(err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest(destination));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browserify']);

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(dir.src + '**/*.*', ['default']);
});
