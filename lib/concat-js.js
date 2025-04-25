/**
 * JavaScript concatenation utility
 */

const fs = require('fs');
const path = require('path');
const concat = require('concat');
const { mkdirp } = require('mkdirp');
const UglifyJS = require('uglify-js');

/**
 * Concatenate and minify JavaScript files
 * @param {Object} options - Configuration options
 * @param {string} options.srcDir - Source directory for JS files (default: 'src/js')
 * @param {string} options.destDir - Destination directory (default: 'dist/js')
 * @param {string} options.tempFile - Temporary concatenated file name (default: 'main.temp.js')
 * @param {string} options.outputFile - Final minified file name (default: 'main.min.js')
 * @param {Array<string>} options.files - Specific files to concatenate (if not provided, will use all JS files)
 */
module.exports = async function concatJs(options = {}) {
    const {
        srcDir = 'src/js',
        destDir = 'dist/js',
        tempFile = 'main.temp.js',
        outputFile = 'main.min.js',
        files
    } = options;

    try {
        // Create destination directory if it doesn't exist
        await mkdirp(destDir);

        // Get JavaScript files to concatenate
        const jsFiles = files ||
            fs.readdirSync(srcDir)
                .filter(file => file.endsWith('.js') && !file.includes('.min.js'))
                .map(file => path.join(srcDir, file));

        if (jsFiles.length === 0) {
            console.log('No JavaScript files found to concatenate');
            return;
        }

        // Concatenate JavaScript files
        const tempFilePath = path.join(destDir, tempFile);
        await concat(jsFiles, tempFilePath);
        console.log(`Concatenated ${jsFiles.length} JavaScript files to ${tempFilePath}`);

        // Minify JavaScript
        const code = fs.readFileSync(tempFilePath, 'utf8');
        const result = UglifyJS.minify(code, {
            compress: true,
            mangle: true
        });

        if (result.error) {
            throw new Error(`Error minifying JavaScript: ${result.error}`);
        }

        const outputFilePath = path.join(destDir, outputFile);
        fs.writeFileSync(outputFilePath, result.code);
        console.log(`Minified JavaScript to ${outputFilePath}`);

        // Remove temporary file
        fs.unlinkSync(tempFilePath);
        console.log(`Removed temporary file ${tempFilePath}`);

    } catch (error) {
        console.error('Error concatenating JavaScript files:', error);
        throw error;
    }
};
