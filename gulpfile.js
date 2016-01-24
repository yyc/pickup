var gulp = require('gulp');
var livereload = require("gulp-livereload");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var nodemon = require("gulp-nodemon");

gulp.task('watch', ['start'], function() {
  livereload.listen({
  });
  gulp.watch(["*.html", "*/*.js"], ['livereload']);
  gulp.watch(['src/*.js', 'src/*/*.js'], ['browserify']);
});

gulp.task('browserify', function() {
       var res = browserify('src/ourtest.js')
          .bundle()
          .pipe(source('chat.js'))
          .on("error", console.log)
          .pipe(gulp.dest('js'));
});
gulp.task("livereload", function(){
    livereload.reload("chat.js");
});
gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  , ext: 'js'
  , env: { 'NODE_ENV': 'development' }
  })
});