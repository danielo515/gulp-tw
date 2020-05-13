const tiddlyWiki = require('tiddlywiki').TiddlyWiki
const http = require('http')
const through = require('through2')

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
    console.log(arguments)
  })
}

function buildTw (cb) {
  runTiddlyWiki('./', '--verbose', '--build', 'index')
  cb()
}

function stopAnyRunningServer (cb) {
  if (!twServer) return cb()
  twServer.close(cb)
}

function serve (cb) {
  runTiddlyWiki('./', '--verbose', '--server', '8087')
  cb()
}

const stringify = (o) => JSON.stringify(o, null, 4)

function pluginInfo () {
  return through.obj(function (file, enc, cb) {
    const content = JSON.parse(file.contents.toString(enc))
    content.released = new Date().toISOString()
    file.contents = Buffer.from(stringify(content))
    console.log(content)
    cb(null, file)
  })
}

module.exports = {
  serve,
  stopAnyRunningServer,
  buildTw,
  pluginInfo,
  runTiddlyWiki
}
