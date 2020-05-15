const through = require('through2')
const Vinyl = require('vinyl')
const path = require('path')
const log = require('fancy-log')
const { wikiFile: wf } = require('./wikiFile')
const stringify = (o) => JSON.stringify(o, null, 4)
/**
 * Generates a `tiddlywiki.files` for each css file that is on the stream where this is added.
 * `tiddlywiki.files` is a metadata file that  allows tiddlywiki to
 * load normal files (ej css) as if they were tiddlers.
 * For now, it only generates one file per folder
 * @param {Object} param
 * @param {string} param.author
 * @param {string} param.pluginName
 */
const annotateCss = ({ author, pluginName }) => {
  const wikiFile = wf({ author, pluginName, tags: '[[$:/tags/Stylesheet]]' })
  const cssFiles = {}
  function iterate (file, enc, next) {
    const folder = file.dirname
    cssFiles[folder] = cssFiles[folder] || { tiddlers: [] }
    cssFiles[folder].tiddlers.push(wikiFile(file.relative))
    log('Registering css file: ', file.relative)
    next(null, file)
  }

  function flush (done) {
    log('Tiddliwiki.files to generate: ', stringify(cssFiles))
    Object.entries(cssFiles).forEach(([folder, tiddlyfiles]) => {
      const dest = path.join(folder, 'tiddlywiki.files')
      log.info('Writting tiddlywiki.files: ', dest)
      const file = new Vinyl({
        base: folder,
        path: dest,
        contents: Buffer.from(stringify(tiddlyfiles))
      })
      this.push(file)
    })
    done()
  }
  return through.obj(iterate, flush)
}
exports.annotateCss = annotateCss
