var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var closureCompiler = require('gulp-closure-compiler');

gulp.task('default', function(){
  gulp.src('src/ajxr.js')
    .pipe(browserify({
      standalone: 'ajxr'
    }))
    .pipe(gulp.dest('./build'));
});
