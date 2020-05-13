const path = require('path')
const { jsHeader } = require('./wikiFile')
const processStream = require('read-vinyl-file-stream')

const alreadyHasHeader = content => (/^\/*\\$/).test(content)

function javascript ({ author, pluginName }) {
  function iterator (content, file, stream, cb) {
    const relativePath = file.relative
    console.info('Processing javascript file: ', file.relative)
    if (alreadyHasHeader(content)){
      console.info('File already has proper header')
      return cb()
    }
    const newContent = jsHeader({ author, pluginName, relativePath, content })
    cb(null, newContent)
  }

  return processStream(iterator)
}

exports.javascript = javascript
