#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const concatCss = require('../lib/concat-css');
const concatJs = require('../lib/concat-js');
const postDist = require('../lib/postdist');

yargs(hideBin(process.argv))
    .command('css', 'Concatenate CSS files', {}, () => {
        console.log('Concatenating CSS files...');
        concatCss();
    })
    .command('js', 'Concatenate JavaScript files', {}, () => {
        console.log('Concatenating JavaScript files...');
        concatJs();
    })
    .command('pd', 'Run post-distribution tasks', {}, () => {
        console.log('Running post-distribution tasks...');
        postDist();
    })
    .demandCommand(1, 'You need to specify at least one command')
    .help()
    .argv;
