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
//
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

// gulp.task('build', function() { return compile(); });
gulp.task('watch', function() {
  gulp.watch(['src'], buildClient);
});

gulp.task('build:client', function() {
  return buildClient();
});


gulp.task('default', gulp.series('build:client', 'watch'));
