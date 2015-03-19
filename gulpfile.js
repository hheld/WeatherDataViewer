/* jshint node: true */

var gulp    = require('gulp'),
    uglify  = require('gulp-uglifyjs');

gulp.task('brackets-onsave', ['uglify', 'distributeHtml', 'distributeCss']);

gulp.task('watch', function() {
    gulp.watch('static/client/**/*.js', ['uglify']);
    gulp.watch('static/client/**/*.html', ['distributeHtml']);
    gulp.watch('static/client/**/*.css', ['distributeCss']);
});

gulp.task('uglify', function () {
    gulp.src(['static/client/**/*.js'])
        .pipe(uglify('WeatherData.min.js'))
        .on('error', swallowError)
        .pipe(gulp.dest('static/dist'));
});

gulp.task('distributeHtml', function () {
    gulp.src('static/client/**/*.html')
        .pipe(gulp.dest('static/dist'));
});

gulp.task('distributeCss', function () {
    gulp.src('static/client/**/*.css')
        .pipe(gulp.dest('static/dist'));
});

gulp.task('default', ['uglify', 'distributeHtml', 'distributeCss']);

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}
