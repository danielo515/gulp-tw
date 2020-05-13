const wikiFile = ({ author, pluginName, tags }) => (fileName) => ({
  file: fileName,
  fields: {
    type: 'text/vnd.tiddlywiki',
    title: `$:/plugins/${author}/${pluginName}/styles/${fileName}`,
    tags
  }
})

exports.wikiFile = wikiFile
