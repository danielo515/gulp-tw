# Gulp-tw
> The almost 0 config tiddlywiki build pipeline!

This is a gulp plugin for easing the creation of tiddlywiki-5 plugins.
Tiddlywiki it's amazing, but it is not what we can call "standard". 
It is almost it's own framework, but very specific rules and a very different ways of doing things, but it provides very little tooling for doing so.
This gulp plugin it's a pre-set/compilation of utilities that I have been using for years in the process of creating tiddlywiki plugins with a high amount of javascript code.

The objective is to provide newcomers a 1 single dependency install to start working with tiddlywiki plugins and a set of utility build pipelines for experienced ones.
Take a look at the usage examples for simple and advanced usage scenarios.

## Features

### Automatic javascript headers

To make tiddlywiki understand javascript files they require a quite complex comment header. This header is complex and hard to write manually and nothing prevents you
from making mistakes that will lead to unexpected behaviors.
For that reason, one of the best features this plugin provides is automatic headers injection. You write plain old javascript files and we will generate the appropiate headers
automatically and inject them during compilation time.
The header will honor the relative path to the file, so you can predict what name an specific file will have once compiled into a tiddliwiki javascript file.
For example, the follogin file name:
`test.js`

Will produce the following header:

```js
/*\
title: $:/plugins/author/pluginName/test.js
type: application/javascript
module-type: library

@preserve

\*/
```

Note that the default module-type is set to library. This means this javascript file does not have any special behavior and it acts just like a library inside tiddlywiki environment.
To use different module types, just put the desired module-type between the file name and the extension. So, if you want to create a widget, then name your file `test.widget.js`.
For a list of available javascript module types take a look here: https://tiddlywiki.com/#ModuleType

### Alias requires

This plugin also includes automatic replacement of require aliases.
In tiddlywiki, in order to require another javascript file you need to provide the plugin namespace and then the file name.
This gets tedious very quickly and your IDE/editor will not provide any help because the weird naming scheme, so you will be doing typos quite often.
This is an example of a normal require inside tiddlywiki:

```js
var test = require('$:/plugins/author/pluginName/test.js');
```

With this plugin you can write the following instead:

```js
var test = require('@plugin/test.js');
```

Way shorter, and it will be expanded to the same thing after compilation.

The problem with tiddlywiki namespace gets worse when your codebase grows and you start having subfolders. Inside tiddlywiki there is no such thing as folders or subfolder, everything are just strings.
So if you want your tiddlywiki files to be named the same way as your folder structure you need to keep that mapping manually, which scales very bad.
Using require alias also has another advantage: if your ide supports it, you can teach it to resolve them. For example, for VSCode you can create the following `jsconfig.json`:

```json
{
    "exclude": ["node_modules","dist"],
    "compilerOptions": {
        "checkJs": true,
        "baseUrl": ".",
        "paths": {
            "@plugin/*": [ "./src/*" ]
        }
    }
}
```
Then you will get all the usual IDE features: 
 - path autocompletion
 - automatic imports
 - warnings when the required path does not exist
 - jump to definition, navigate to file
 - code intellisense
 - require rewrites when you move a file

Pretty nice improvements for such small addition, isn't it?


## Usage

### Basic

```javascript
// gulpfile.js
const gtw = require("gulp-tw");
const sources = {};

const tiddlywiki = gtw({
  author: "danielo515",
  pluginName: "myPlugin",
  sources,
});

// Export all the tasks!
// you can run gulp --tasks to get a list of the available ones
module.exports = {
    ...tiddlywiki
}
```

### Providing specific paths

You can configure where each type of supported source is located

```javascript
// gulpfile.js
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