const gulp = require('gulp')
const Sass = require('gulp-sass')
Sass.compiler = require('sass')

const main = ({ author, pluginName }) => {
  const { serve, buildTw, stopAnyRunningServer, pluginInfo } = require('./tiddlywiki')
  const { annotateCss } = require('./src/annotateCss')
  const sources = {
    sass: './src/**/*.scss',
    tiddlers: './src/**/*.tid',
    js: './src/**/*.js',
    pluginInfo: './src/plugin.info',
    output: `./plugins/${pluginName}`
  }
  // ==================================================
  // ====================== TASKS =====================
  // ==================================================
  function sass () {
    return gulp
      .src(sources.sass)
      .pipe(Sass().on('error', Sass.logError))
      .pipe(annotateCss({ pluginName, author }))
      .pipe(gulp.dest(sources.output))
  }

  function tiddlers () {
    return gulp.src(sources.tiddlers).pipe(gulp.dest(sources.output))
  }

  function js () {
    return gulp.src(sources.js).pipe(gulp.dest(sources.output))
  }

  function processPluginInfo () {
    return gulp
      .src(sources.pluginInfo)
      .pipe(pluginInfo())
      .pipe(gulp.dest(sources.output))
  }

  const defaultTask = gulp.parallel(tiddlers, js, sass, processPluginInfo)
  const build = gulp.series(defaultTask, buildTw)

  function watch () {
    return gulp.watch('./src/**', { ignoreInitial: false }, gulp.series(defaultTask, stopAnyRunningServer, serve))
  }

  return {
    tiddlers,
    sass,
    serve,
    watch,
    build,
    default: defaultTask
  }
}

module.exports = main
