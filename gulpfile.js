// Load Gulp...of course
const gulp = require('gulp');

// CSS related plugins
var sass         =  require('gulp-sass')(require('sass'));
var autoprefixer = require( 'gulp-autoprefixer' );

// JS related plugins
var uglify = require('gulp-uglify');

// Utility plugins
var sourcemaps	= require( 'gulp-sourcemaps' );
var rename		= require("gulp-rename");

// Project related variables
var paths = {
	styles: {
		src: 'src/scss/**/*.scss',
		dest: 'css/',
		mapurl: './',
	},
	scripts: {
		src: 'src/js/**/*.js',
		dest: 'js/',
		mapurl: './'
	},
	vendor: {
		src: 'src/scss/vendor/**/*.scss',
		dest: 'css/',
		mapurl: './'
	},
	fontawesome: {
		src: 'node_modules/@fortawesome/fontawesome-free/webfonts/*',
		dest: 'fonts/',
		cssSrc: 'src/scss/vendor/font-awesome.scss',
		cssDest: 'css/',
		mapurl: './'
	},
	bootstrap: {
		src: [
			'node_modules/bootstrap/dist/js/*',
			//'node_modules/popper.js/dist/umd/popper.min.js',
			//'node_modules/popper.js/dist/umd/popper.min.js.map'
		],
		dest: 'js/',
		cssSrc: 'src/scss/vendor/bootstrap.scss',
		cssDest: 'css/',
		mapurl: './'
	}
};

function styles() {
  return gulp.src([paths.styles.src, '!src/scss/vendor/**/*.scss' ])
  	.pipe( sourcemaps.init() )
    .pipe( sass({
		errLogToConsole: true,
		outputStyle: 'expanded'
	}) )
	.on( 'error', console.error.bind( console ) )
	.pipe(autoprefixer())
    .pipe( sourcemaps.write( paths.styles.mapurl ) )
    .pipe( gulp.dest(paths.styles.dest) )
}

function minstyles() {
  return gulp.src([paths.styles.src, '!src/scss/vendor/**/*.scss'])
    .pipe( sourcemaps.init() )
    .pipe( sass({
		errLogToConsole: true,
		outputStyle: 'compressed'
	}) )
	.on( 'error', console.error.bind( console ) )
	.pipe(autoprefixer())
	.pipe( rename( { suffix: '.min' } ) )
    .pipe( sourcemaps.write( paths.styles.mapurl ) )
    .pipe( gulp.dest(paths.styles.dest) );
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
  	.pipe( sourcemaps.init({ loadMaps: true }) )
  	.pipe( sourcemaps.write( paths.scripts.mapurl ) )
    .pipe(gulp.dest(paths.scripts.dest));
}

function minscripts() {
  return gulp.src(paths.scripts.src)
  	.pipe( sourcemaps.init({ loadMaps: true }) )
    .pipe(uglify())
    .pipe( rename( { suffix: '.min' } ) ) // Alternative: extname: '.min.js'
    .pipe( sourcemaps.write( paths.scripts.mapurl ) )
    .pipe(gulp.dest(paths.scripts.dest));
}

function fontawesomeFonts() {
  return gulp.src(paths.fontawesome.src)
        .pipe(gulp.dest(paths.fontawesome.dest));
}

function fontawesomeStyle() {
	return gulp.src([paths.fontawesome.cssSrc ])
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			outputStyle: 'expanded'
		}) )
		.on( 'error', console.error.bind( console ) )
		.pipe(autoprefixer())
		.pipe( sourcemaps.write( paths.fontawesome.mapurl ) )
		.pipe( gulp.dest(paths.fontawesome.cssDest) );
}

function fontawesomeMinStyle() {
	return gulp.src([paths.fontawesome.cssSrc ])
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}) )
		.on( 'error', console.error.bind( console ) )
		.pipe(autoprefixer())
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( sourcemaps.write( paths.fontawesome.mapurl ) )
		.pipe( gulp.dest(paths.fontawesome.cssDest) );
}

function bootstrapScript() {
  return gulp.src(paths.bootstrap.src)
        .pipe(gulp.dest(paths.bootstrap.dest));
}

function bootstrapStyle() {
	return gulp.src([paths.bootstrap.cssSrc])
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			outputStyle: 'expanded'
		}) )
		.on( 'error', console.error.bind( console ) )
		.pipe(autoprefixer())
		.pipe( sourcemaps.write( paths.fontawesome.mapurl ) )
		.pipe( gulp.dest(paths.bootstrap.cssDest) );
}

function bootstrapMinStyle() {
	return gulp.src([paths.bootstrap.cssSrc])
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}) )
		.on( 'error', console.error.bind( console ) )
		.pipe(autoprefixer())
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( sourcemaps.write( paths.bootstrap.mapurl ) )
		.pipe( gulp.dest(paths.bootstrap.cssDest) );
}

function vendorStyle() {
	return gulp.src([paths.vendor.src])
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}) )
		.on( 'error', console.error.bind( console ) )
		.pipe(autoprefixer())
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( sourcemaps.write( paths.vendor.mapurl ) )
		.pipe( gulp.dest(paths.vendor.dest) );
}

function vendorMinStyles() {
	return gulp.src([paths.vendor.src])
	  .pipe( sourcemaps.init() )
	  .pipe( sass({
		  errLogToConsole: true,
		  outputStyle: 'compressed'
	  }) )
	  .on( 'error', console.error.bind( console ) )
	  .pipe(autoprefixer())
	  .pipe( rename( { suffix: '.min' } ) )
	  .pipe( sourcemaps.write( paths.styles.mapurl ) )
	  .pipe( gulp.dest(paths.vendor.dest) );
  }

function watch() {
	gulp.watch(paths.scripts.src, scripts);
	gulp.watch(paths.scripts.src, minscripts);
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.styles.src, minstyles);
}

var fontawesome = gulp.series(gulp.parallel(fontawesomeFonts, fontawesomeStyle, fontawesomeMinStyle));
var bootstrap 	= gulp.series(gulp.parallel(bootstrapScript, bootstrapStyle, bootstrapMinStyle));
var vendor 		= gulp.series(gulp.parallel(vendorMinStyles, vendorStyle, bootstrapScript, fontawesomeFonts));
var build 		= gulp.series(gulp.parallel(styles, minstyles, scripts, minscripts, fontawesomeFonts, fontawesomeStyle, fontawesomeMinStyle, bootstrapScript, bootstrapStyle, bootstrapMinStyle));

exports.styles = styles;
exports.minstyles = minstyles;
exports.scripts = scripts;
exports.minscripts = minscripts;
exports.fontawesome = fontawesome;
exports.bootstrap = bootstrap;
exports.vendor = vendor;
exports.watch = watch;
exports.build = build;