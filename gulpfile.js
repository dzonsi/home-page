var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify'),
    browserSync = require('browser-sync').create();

function css() {
  return gulp.src('./src/main.css')
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename(function(path) {
      path.extname = ".min.css";
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
}

function html() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./public/'));
}

function serve() {
	browserSync.init({
		server: {
			baseDir: './public'
		}
	})
}

function js() {
    return gulp.src('./src/*.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.stream());
}
function images() {
    return gulp.src('./src/images/*.{png,jpg,jpeg}')
      .pipe(gulp.dest('./public/images/'));
}
function icons() {
    return gulp.src('./src/icons/*.svg')
      .pipe(gulp.dest('./public/icons/'));
}

gulp.watch('./src/*.css', css);
gulp.watch('./src/*.js', js);
gulp.watch('./src/images*.{png,jpg,jpeg}', images);
gulp.watch('./src/icons*.svg', icons);
gulp.watch('./src/*.html', html).on('change', browserSync.reload);

exports.default = gulp.parallel(html, css, js, images, icons, serve);