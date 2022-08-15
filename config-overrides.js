// https://github.com/microsoft/PowerBI-visuals-tools/issues/365#issuecomment-875479827
// https://stackoverflow.com/a/67233156
const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        url: require.resolve('url'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        buffer: require.resolve('buffer'),
        url: require.resolve("url/"),
        stream: require.resolve('stream-browserify'),
        querystring: require.resolve("querystring-es3"),
        buffer: require.resolve("buffer/"),
        zlib: require.resolve("browserify-zlib"),
        assert: require.resolve("assert/"),
        util: require.resolve("util/"),
        "fs": false,
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}