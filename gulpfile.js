var gulp = require('gulp');
var livereload = require("gulp-livereload");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('watch', function() {
  livereload.listen({
  });
  gulp.watch(["*.html", "*/*.js"], ['livereload']);
  gulp.watch('src/*.js', ['browserify']);
});


gulp.task('browserify', function() {
   return browserify('src/ourtest.js')
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('js'));
});
gulp.task("livereload", function(){
    livereload.reload("index.html");
});