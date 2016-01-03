var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    compass   = require('gulp-compass'),
    livereload = require('gulp-livereload');

gulp.task('webserver', function() {
  gulp.src('./app/')
    .pipe(webserver({
      port:1234,
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('compass',function(){
    return gulp.src('./app/style/scss/*.scss')
        .pipe(compass({
            sourcemap: true,
            time: true,
      css: './app/style/css/',
      sass: './app/style/scss/',
      style: 'compact' //nested, expanded, compact, compressed
        }))
        .pipe(gulp.dest('./app/style/css/'));
}); 

gulp.task('watch',function(){
    var server = livereload();
    gulp.watch('./app/style/scss/*.scss',['compass']);
    gulp.watch('*.*', function (file) {  // 監控的檔案，在這裏 '*.*' 我監控所有檔案
       server.changed(file.path);
   });
});


gulp.task('default',['webserver','compass','watch']);