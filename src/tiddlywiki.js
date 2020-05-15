const tiddlyWiki = require('tiddlywiki').TiddlyWiki
const log = require('fancy-log')
const http = require('http')
const through = require('through2')
const stringify = (o) => JSON.stringify(o, null, 4)

const _createServer = http.createServer
let twServer

http.createServer = function createServerMock () {
  twServer = _createServer.apply(http, arguments)
  return twServer
}

function runTiddlyWiki () {
  var $tw = tiddlyWiki()
  $tw.boot.argv = Array.prototype.slice.call(arguments, 0)
  $tw.boot.boot(function () {
    log(arguments)
  })
}

/**
 * Creates a module with functions for building and serving tiddlywiki files
 * @param {Object} config
 * @param {string} config.wikiDir path to the wiki folder to use
 */
const main = ({ wikiDir }) => {
  function stopAnyRunningServer (cb) {
    if (!twServer) return cb()
    twServer.close(cb)
  }

  /**
  * Builds a tiddlywiki index file
  * @param {Function} cb callback to continue the gulp chain
  */
  function buildTw (cb) {
    runTiddlyWiki(wikiDir, '--verbose', '--build', 'index')
    cb()
  }

  /**
  * Starts a tiddlywiki server for testing the plugin
  * @param {Function} cb callback to continue the gulp chain
  */
  function serve (cb) {
    runTiddlyWiki(wikiDir, '--verbose', '--server', '8087')
    cb()
  }
  return {
    serve,
    stopAnyRunningServer,
    buildTw,
    pluginInfo,
    runTiddlyWiki
  }
}

function pluginInfo () {
  return through.obj(function (file, enc, cb) {
    const content = JSON.parse(file.contents.toString(enc))
    content.released = new Date().toISOString()
    file.contents = Buffer.from(stringify(content))
    log(content)
    cb(null, file)
  })
}

module.exports = main
