// Include gulp
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// Include Our Plugins
var cache = require('gulp-cache');
var del = require('del');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var rename = require('gulp-rename');


function browserSyncInit(baseDir, files, browser) {
browser = browser === undefined ? 'Firefox Developer Edition' : browser;

browserSync.instance = browserSync.init(files, {
startPath: '/index.html',
server: {
baseDir: baseDir,
middleware: proxyMiddleware
},
browser: browser
});

}

gulp.task('browserSync', function() {
  browserSync.init({
    options: {
        server: {
        baseDir: 'app',
      },
      browser: "/Applications/Firefox Developer Edition/firefox.exe"
    }
  })
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      // Setting interlaced to true
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
      stream: true
    }))
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
   .pipe(gulpIf('*.js', uglify()))
   .pipe(gulp.dest('dist'))
});

// Watch Files For Changes
gulp.task('watch', ['browserSync', 'sass', 'watch'], function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
