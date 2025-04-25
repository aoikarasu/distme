# @aoikarasu/distme

A utility package for building and distributing frontend projects. Not the best one, but at least mine.

The purpose of this tool is to concat and minify all styles and scripts into single-file bundles, and post process the `index.html` file to replace `.css` and `.js` file references with `.min.css` and `.min.js`. It uses [clean-css] and [uglify-js] to get the job done.

## Contents

* [Installation](#installation)
* [Usage](#usage)
  * [Command Line Interface](#command-line-interface)
  * [API Usage](#api-usage)
* [Configuration](#configuration)
* [AOI](#aoi)
* [License](#license)

## Installation

```bash
npm install @aoikarasu/distme --save-dev
```

## Usage

### Command Line Interface

You can use the CLI commands to run the various build utilities:

```bash
# Concatenate and minify CSS files
distme css

# Concatenate and minify JavaScript files
distme js

# Run post-distribution tasks
distme pd
```

### API Usage

You can also use the package programmatically in your Node.js scripts:

```javascript
const { concatCss, concatJs, postDist } = require('@aoikarasu/distme');

// Concatenate CSS files with custom options
concatCss({
  srcDir: 'src/styles',
  destDir: 'dist/styles',
  outputFile: 'bundle.min.css'
});

// Concatenate JavaScript files with custom options
concatJs({
  files: [
    'src/js/vendor/jquery.js',
    'src/js/main.js',
    'src/js/app.js'
  ],
  destDir: 'dist/js',
  outputFile: 'bundle.min.js'
});

// Run post-distribution tasks
postDist({
  updateVersion: true,
  addTimestamp: true
});
```

## Configuration

Each utility function accepts a configuration object with the following options:

### concatCss Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| srcDir | _string_ | 'src/css' | Source directory for CSS files |
| destDir | _string_ | 'dist/css' | Destination directory |
| tempFile | _string_ | 'styles.temp.css' | Temporary concatenated file name |
| outputFile | _string_ | 'styles.min.css' | Final minified file name |
| files | _Array<string>_ | null | Specific files to concatenate (if not provided, will use all CSS files) |

### concatJs Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| srcDir | _string_ | 'src/js' | Source directory for JS files |
| destDir | str_ing | 'dist/js' | Destination directory |
| tempFile | _string_ | 'main.temp.js' | Temporary concatenated file name |
| outputFile | _string_ | 'main.min.js' | Final minified file name |
| files | _Array<string>_ | null | Specific files to concatenate (if not provided, will use all JS files) |

### postDist Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| distDir | _string_ | 'dist' | Distribution directory |
| updateVersion | _boolean_ | true | Whether to update version in HTML |
| addTimestamp | _boolean_ | true | Whether to add build timestamp |

## AOI

Aoi (青い) means blue in japanese. In Japanese, 青 is used to describe blue things, such as 青い空 (blue sky)、青い海 (blue ocean). Aoi (青い) can also be translated to “fresh” or “newly grown”, such as vegetation which can have a blueish green color at times. It can also be referred to as an adjective to describe someone who is “inexperienced” or “fresh to the Industry.”  However, keep in mind あおい isn’t loosely interchangeable with みどり. [^1]

[^1]: bit.ly/aoi-blue

## License

[MIT][license] © [Aoi Karasu][author]

[aoi]: #aoi

[author]: https://aoikarasu.github.io/

[clean-css]: https://www.npmjs.com/package/clean-css

[distme]: https://github.com/aoikarasu/distme

[license]: license

[uglify-js]: https://www.npmjs.com/package/uglify-js
