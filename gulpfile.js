let gulp = require('gulp');

gulp.task('default', function() {
    console.log('Hello, Gulp');
});

uglify = require('gulp-uglify');

gulp.task('minify', function () {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

