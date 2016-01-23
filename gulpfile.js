var gulp = require('gulp');
var livereload = require("gulp-livereload");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('watch', function() {
  livereload.listen({
  });
  gulp.watch(["*.html", "*/*.js"], ['livereload']);
  gulp.watch(['src/*.js', 'src/*/*.js'], ['browserify']);
});

gulp.task('browserify', function() {
       var res = browserify('src/chat.js')
          .bundle()
          .pipe(source('chat.js'))
          .pipe(gulp.dest('js'))
          .on("error", function(error){
              console.log(error);
          });
});
gulp.task("livereload", function(){
    livereload.reload("index.html");
});