const { tiddlerHeader } = require('./wikiFile')
const processStream = require('read-vinyl-file-stream')
const log = require('fancy-log')

/**
 *
 * @param {Object} conf
 * @param {string} conf.author
 * @param {string} conf.pluginName
 */
function html ({ author, pluginName }) {
  /**
   * Iterates a stream of vinyl files
   * @param {string} content the file contents
   * @param {any} file The vinyl file object
   * @param {any} stream the stream itself
   * @param {Function} cb the callback to continue process chain
   */
  function iterator (content, file, stream, cb) {
    /**
     * @type {string}
     */
    const relativePath = file.relative.replace(/\.html$/, '')
    log.info('Processing html file: ', file.relative)
    file.extname = '.tid'
    const newContent = tiddlerHeader({ author, pluginName, relativePath, content })
    cb(null, newContent)
  }

  return processStream(iterator)
}

exports.html = html
