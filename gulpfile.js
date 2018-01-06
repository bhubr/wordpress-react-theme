var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var pathmod = require('pathmodify');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var zip = require('gulp-zip');
var fs = require('fs');

var archiveFiles = [
  'style.css',
  'screenshot.png',
  '*.php'
];

function buildClient(watch, done) {
  var bundler =
    browserify('./src/index.js', { debug: true })
      .plugin(pathmod(), {mods: [
        pathmod.mod.dir('node_modules', __dirname + '/node_modules'),
      ]})
      // Transform JSX      https://github.com/andreypopp/reactify/issues/58
      // Fix unexpected ... https://github.com/babel/babel-loader/issues/170
      .transform(babelify, { presets: ['es2015', 'stage-0', 'react'] });
  return new Promise(function (resolve, reject) {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('bundle.react.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./js'))
      .on('end', resolve);
  });
}

function makeZip() {
  return gulp.src(archiveFiles)
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('dist'));
}

// gulp.task('build', function() { return compile(); });
gulp.task('watch', function() {
  gulp.watch(['src'], buildClient);
  gulp.watch(archiveFiles, makeZip);
});

gulp.task('buildClient', function() {
  return buildClient();
});

gulp.task('makeZip', makeZip);

gulp.task('default', gulp.series('buildClient', 'makeZip', 'watch'));
