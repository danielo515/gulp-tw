const { jsHeader } = require('./wikiFile')
const processStream = require('read-vinyl-file-stream')
const log = require('fancy-log')
const alreadyHasHeader = (content) => content.trim().startsWith('/*\\\n')
/**
 *
 * @param {Object} conf
 * @param {string} conf.author
 * @param {string} conf.pluginName
 */
function javascript ({ author, pluginName }) {
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
    const relativePath = file.relative
    log.info('Processing javascript file: ', file.relative)
    if (alreadyHasHeader(content)) {
      log.info('File already has proper header')
      return cb()
    }
    const newContent = jsHeader({ author, pluginName, relativePath, content })
    cb(null, newContent)
  }

  return processStream(iterator)
}

exports.javascript = javascript
