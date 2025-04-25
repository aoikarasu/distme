/**
 * CSS concatenation utility
 */

const fs = require('fs');
const path = require('path');
const concat = require('concat');
const { mkdirp } = require('mkdirp');
const CleanCSS = require('clean-css');

/**
 * Concatenate and minify CSS files
 * @param {Object} options - Configuration options
 * @param {string} options.srcDir - Source directory for CSS files (default: 'src/css')
 * @param {string} options.destDir - Destination directory (default: 'dist/css')
 * @param {string} options.tempFile - Temporary concatenated file name (default: 'styles.temp.css')
 * @param {string} options.outputFile - Final minified file name (default: 'styles.min.css')
 * @param {Array<string>} options.files - Specific files to concatenate (if not provided, will use all CSS files)
 */
module.exports = async function concatCss(options = {}) {
    const {
        srcDir = 'src/css',
        destDir = 'dist/css',
        tempFile = 'styles.temp.css',
        outputFile = 'styles.min.css',
        files
    } = options;

    try {
        // Create destination directory if it doesn't exist
        await mkdirp(destDir);

        // Get CSS files to concatenate
        const cssFiles = files ||
            fs.readdirSync(srcDir)
                .filter(file => file.endsWith('.css') && !file.includes('.min.css'))
                .map(file => path.join(srcDir, file));

        if (cssFiles.length === 0) {
            console.log('No CSS files found to concatenate');
            return;
        }

        // Concatenate CSS files
        const tempFilePath = path.join(destDir, tempFile);
        await concat(cssFiles, tempFilePath);
        console.log(`Concatenated ${cssFiles.length} CSS files to ${tempFilePath}`);

        // Minify CSS
        const minified = new CleanCSS().minify(fs.readFileSync(tempFilePath, 'utf8'));
        const outputFilePath = path.join(destDir, outputFile);
        fs.writeFileSync(outputFilePath, minified.styles);
        console.log(`Minified CSS to ${outputFilePath} (${Math.round(minified.stats.efficiency * 100)}% compression)`);

        // Remove temporary file
        fs.unlinkSync(tempFilePath);
        console.log(`Removed temporary file ${tempFilePath}`);

    } catch (error) {
        console.error('Error concatenating CSS files:', error);
        throw error;
    }
};
