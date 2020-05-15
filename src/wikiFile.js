const wikiFile = ({ author, pluginName, tags }) => (fileName) => ({
  file: fileName,
  fields: {
    type: 'text/vnd.tiddlywiki',
    title: `$:/plugins/${author}/${pluginName}/styles/${fileName}`,
    tags
  }
})

exports.wikiFile = wikiFile

/**
 * @typedef {
"allfilteroperator" | "animation" | "authenticator" | "bitmapeditoroperation" | "command" | "config" | "filteroperator" | "global" | "indexer" | "info" | "isfilteroperator" | "library" | "macro" | "parser" | "route" | "saver" | "startup" | "storyview" | "texteditoroperation" | "tiddlerdeserializer" | "tiddlerfield" | "tiddlermethod" | "upgrader" | "utils" | "utils-node" | "widget" | "wikimethod" | "wikirule" } moduleType
 */

/**
 * Generates a javascript file with proper headers for it to be understood by tiddlywiki
 * @param {Object} options
 * @param {string} options.author
 * @param {string} options.pluginName
 * @param {string} options.relativePath the file relative path. Used to keep a similar structure between filesystem and plugin namespace
 * @param {string} options.content content
 * @param {moduleType} [ options.moduleType ] if it is a library,widget, etc
 */
const jsHeader = ({
  author,
  pluginName,
  relativePath,
  content,
  moduleType = 'library'
}) =>
  `/*\\
title: $:/plugins/${author}/${pluginName}/${relativePath}
type: application/javascript
module-type: ${moduleType}

@preserve

\\*/

${content}
`

exports.jsHeader = jsHeader
/**
 * Generates a tiddler content file with the proper metadata on the top
 * @param {Object} options
 * @param {string} options.author
 * @param {string} options.pluginName
 * @param {string} options.relativePath the file relative path. Used to keep a similar structure between filesystem and plugin namespace
 * @param {string} options.content content
 */
const tiddlerHeader = ({
  author,
  pluginName,
  relativePath,
  content
}) => `
title: $:/plugins/${author}/${pluginName}/${relativePath}
type: text/vnd.tiddlywiki

${content}
`.trim()

exports.tiddlerHeader = tiddlerHeader
