const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './app.js', // Your main entry file
    target: 'node', // For backend
    externals: [nodeExternals()], // Exclude `node_modules`
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: 'production',
};
