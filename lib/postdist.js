/**
 * Post-distribution utility
 * This script handles any tasks that need to be performed after the build process
 */

const fs = require('fs');
const path = require('path');

/**
 * Run post-distribution tasks
 * @param {Object} options - Configuration options
 * @param {string} options.distDir - Distribution directory (default: 'dist')
 * @param {boolean} options.updateVersion - Whether to update version in HTML (default: true)
 * @param {boolean} options.addTimestamp - Whether to add build timestamp (default: true)
 */
module.exports = function postDist(options = {}) {
    const {
        distDir = 'dist',
        updateVersion = true,
        addTimestamp = true
    } = options;

    try {
        // Get package.json data for version information
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        const version = packageJson.version;

        console.log(`Running post-distribution tasks for version ${version}`);

        // Get the HTML file path
        const htmlFilePath = path.join(distDir, 'index.html');

        if (!fs.existsSync(htmlFilePath)) {
            console.warn(`HTML file not found at ${htmlFilePath}`);
            return;
        }

        // Read the HTML file
        let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

        // Replace file references
        htmlContent = htmlContent
            .replace(/styles\.css/g, 'styles.min.css')
            .replace(/main\.js/g, 'main.min.js');

        // Update version if required
        if (updateVersion) {
            // Replace version placeholder with actual version
            htmlContent = htmlContent.replace(/{{VERSION}}/g, version);
            console.log(`Updated version to ${version}`);
        }

        // Add timestamp if required
        if (addTimestamp) {
            const timestamp = new Date().toISOString();
            // Replace build timestamp placeholder
            htmlContent = htmlContent.replace(/{{BUILD_TIME}}/g, timestamp);
            console.log(`Added build timestamp: ${timestamp}`);
        }

        // Write the updated HTML file
        fs.writeFileSync(htmlFilePath, htmlContent);
        console.log(`Updated HTML file at ${htmlFilePath}`);

        // Create a version.json file in the dist directory
        const versionData = {
            version,
            buildTimestamp: new Date().toISOString(),
            buildEnvironment: process.env.NODE_ENV || 'production'
        };

        fs.writeFileSync(
            path.join(distDir, 'version.json'),
            JSON.stringify(versionData, null, 2)
        );

        console.log('Post-distribution tasks completed successfully');

    } catch (error) {
        console.error('Error running post-distribution tasks:', error);
        throw error;
    }
};
