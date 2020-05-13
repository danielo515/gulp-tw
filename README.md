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
