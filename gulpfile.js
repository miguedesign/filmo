var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var smoosher = require('gulp-smoosher');


var config = {
  html: {
    main: './src/index.html',
    watch: './src/*.html',
    output: './dist/'
  },
  styles: {
  	//Ruta de archivo generado entrada
    main: './src/stylus/style.styl',
    //Ruta de archivos de desarrollo
    watch: './src/stylus/**/*.styl',
    //Ruta de salida de archivos
    output: './dist/assets/css'
  },
  scripts: {
  	main: './src/assets/js/main.js',
  	watch: './src/assets/js/**/*.js',
  	output: './dist/assets/js'
  }
}

gulp.task('build:html', function() {
  gulp.src(config.html.main)
    .pipe(gulp.dest(config.html.output));
});

gulp.task('build:css', function() {
  gulp.src(config.styles.main)
    .pipe(stylus({
      use: nib(),
      'include css': true
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.styles.output));
});

//se debe instalar el modulo de browserify
gulp.task('build:js', function() {
  return browserify(config.scripts.main)
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.scripts.output));
});


gulp.task('inline', function() {
	gulp.src('./src/index.html')
		.pipe(smoosher())
		.pipe(gulp.dest('./dist/'));
});


gulp.task('watch', function() {
  gulp.watch(config.html.watch, ['build:html']);
  gulp.watch(config.styles.watch, ['build:css']);
  gulp.watch(config.scripts.watch, ['build:js']);
});


gulp.task('build', ['build:html', 'build:css', 'build:js']);

gulp.task('default', ['watch', 'build']);






