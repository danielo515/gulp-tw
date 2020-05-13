const wikiFile = ({ author, pluginName, tags }) => (fileName) => ({
  file: fileName,
  fields: {
    type: 'text/vnd.tiddlywiki',
    title: `$:/plugins/${author}/${pluginName}/styles/${fileName}`,
    tags
  }
})

exports.wikiFile = wikiFile

const jsHeader = ({ author, pluginName, relativePath, content, type = 'application/javascript' }) =>
`/*\\
title: $:/plugins/${author}/${pluginName}/${relativePath}
type: ${type}
module-type: library

@preserve

\\*/

${content}
`

exports.jsHeader = jsHeader
