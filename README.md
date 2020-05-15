## Usage

```javascript
const gtw = require("gulp-tw");
const sources = {
  sass: "./src/**/*.scss",
  tiddlers: "./src/**/*.tid",
  javascript: "./src/**/*.js",
  pluginInfo: "./src/plugin.info",
};

const tiddlywiki = gtw({
  author: "danielo515",
  pluginName: "myPlugin",
  sources,
  outputDir: './plugins', // optional, defaults to this
});

// Export all the tasks!
// You can also select a subset
module.exports = {
    ...tiddlywiki
}
```

For a real world simple usage example take a look at [this gulpfile](https://github.com/danielo515/TW5-EncryptTiddlerPlugin/blob/606ca70ee6f5898920bf2aff13878e94362fa7df/gulpfile.js)