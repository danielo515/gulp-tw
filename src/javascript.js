const { jsHeader } = require('./wikiFile')
const processStream = require('read-vinyl-file-stream')
const log = require('fancy-log')
const alreadyHasHeader = (content) => content.trim().startsWith('/*\\\n')
/** @type import('./wikiFile').moduleType[] */
const jsModuleTypes = [
  'allfilteroperator',
  'animation',
  'authenticator',
  'bitmapeditoroperation',
  'command',
  'config',
  'filteroperator',
  'global',
  'indexer',
  'info',
  'isfilteroperator',
  'library',
  'macro',
  'parser',
  'route',
  'saver',
  'startup',
  'storyview',
  'texteditoroperation',
  'tiddlerdeserializer',
  'tiddlerfield',
  'tiddlermethod',
  'upgrader',
  'utils',
  'utils-node',
  'widget',
  'wikimethod',
  'wikirule'
]
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
      log.info(`File ${relativePath} already has proper header`)
      return cb(null, content)
    }
    const moduleType =
      jsModuleTypes.find((moduleType) =>
        file.basename.includes(`.${moduleType}.`)
      ) || 'library'
    const newContent = jsHeader({
      author,
      pluginName,
      relativePath,
      content,
      moduleType
    })
    cb(null, newContent)
  }

  return processStream(iterator)
}

exports.javascript = javascript
