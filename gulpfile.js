const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const pathmod = require('pathmodify');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const zip = require('gulp-zip');
const fs = require('fs');
const es = require('event-stream');

const archiveFiles = [
  'style.css',
  'screenshot.png',
  '*.php'
];
const builtFiles = [
  'js/*'
];
const watchedFiles = [
  'style.css',
  'screenshot.png',
  '*.php',
  'js/*'
];

const themeName = 'reago';

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
      // .pipe(uglify())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./js'))
      .on('end', resolve);
  });
}

function extractThemeVersion() {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/style.css', (err, buf) => {
      if(err) return reject(err);
      const stylesheet = buf.toString();
      const versionRegex = /Version\: ([0-9\.]+)/g;
      const matches = versionRegex.exec(stylesheet);
      themeVersion = matches[1];
      resolve(themeVersion);
    });
  });
}

function makeZip(cb) {
  return extractThemeVersion()
    .then(themeVersion => {
      var base = 'dist/' + themeVersion;
      var tmp = base + '/reago';
      var rebasedFiles = base + '/**/*';
      es.concat(
          gulp.src(archiveFiles)
              .pipe(gulp.dest(tmp)),
            gulp.src(builtFiles)
                .pipe(gulp.dest( tmp + '/js')),
          gulp.src(rebasedFiles, { base })
              .pipe(zip(themeName + '-' + themeVersion + '.zip'))
              .pipe(gulp.dest('dist'))
      ).on('end', cb)
    });
}

gulp.task('watch', function() {
  gulp.watch(['src'], buildClient);
  // gulp.watch(watchedFiles, makeZip);
});

gulp.task('buildClient', function() {
  return buildClient();
});

gulp.task('makeZip', makeZip);

gulp.task('default', gulp.series('buildClient', 'watch'));
