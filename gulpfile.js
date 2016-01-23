var gulp = require('gulp');
var livereload = require("gulp-livereload");
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/*.js', ['browserify']);
});


gulp.task('browserify', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });
  
  return gulp.src(['src/*.js'])
    .pipe(browserified)
    .pipe(uglify())
    .pipe(gulp.dest('js/app.js'));
});
