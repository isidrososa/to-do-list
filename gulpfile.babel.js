'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const plugins = gulpLoadPlugins();

const config = {
  bootstrapDir: './client/lib/bootstrap-sass',
  fontAwesomeDir: './client/lib/font-awesome'
};

// Init nodemon server and integrate with browser-sync
const browserSyncReloadDelay = 500;

// Set NODE_ENV to development
gulp.task('env:dev', () => {
  process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to production
gulp.task('env:prod', () => {
  process.env.NODE_ENV = 'production';
});

// Set NODE_ENV to test
gulp.task('env:test', () => {
  process.env.NODE_ENV = 'test';
});

// Build CSS
gulp.task('build:css', () => {
  gulp.src('./client/assets/stylesheets/*.scss')
    .pipe(plugins.sass({
      outputStyle: 'compressed',
      includePaths: [
        config.bootstrapDir + '/assets/stylesheets',
        config.fontAwesomeDir + '/scss'
      ]
    })
      .on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./client/dist/css'));
});

gulp.task('cssmin', ['build:css'], () => {
  gulp.src('./client/dist/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.concat('main.min.css'))
    .pipe(gulp.dest('./client/dist/css/'));
});

gulp.task('nodemon', cb => {
  var called = false;

  plugins.nodemon({

    // nodemon our expressjs server
    script: 'server.js',

    // watch core server file(s) that require server restart on change
    watch: ['server.js', 'server/**/*.js', 'config/**/*.js']
  })
    .on('start', () => {
      // ensure start only got called once
      if (!called) {
        cb();
      }
      called = true;
    })
    .on('restart', () => {
      // reload connected browser after a slight delay
      setTimeout(() => {
        browserSync.reload({
          stream: false
        }, browserSyncReloadDelay);
      });
    });
});

gulp.task('build:fonts', () => {
  gulp.src(config.fontAwesomeDir + '/fonts/*')
    .pipe(gulp.dest('./client/dist/fonts'));
});

gulp.task('sync', ['nodemon'], () => {
  var port = process.env.PORT || 8080;
  // for more browser-sync config options http://www.browsersync.io/docs/options/
  browserSync({
    // informs browser-sync to proxy expressjs app which would run at the following location
    proxy: 'http://localhost:' + port,

    // informs browser-sync to use the following port for the proxied app
    // notice that default port is 3000, which would clash with our expressjs
    port: 3000,

    // Don't open browser automatically
    open: false,

    // Don't notify
    notify: false,

    // open the proxied app in
    browser: [process.env.BROWSER || 'chromium']
  });

  gulp.watch('./server/views/**/*.html').on('change', browserSync.reload);
  gulp.watch('./client/dist/css/*.css').on('change', browserSync.reload);
});

gulp.task('sync:reload', () => {
  browserSync.reload();
});

// Build assets for production
gulp.task('build', ['cssmin', 'build:fonts']);

// Watch change in frontend files
gulp.task('watch', () => {
  gulp.watch('./client/assets/stylesheets/**/*.scss', ['build:css']);
});

gulp.task('default', ['build', 'watch', 'sync']);