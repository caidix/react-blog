const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => { }
}

// module.exports = withLess(withCss({
//     // cssModules: true,
//     webpack: (config) => {
//         config.plugins.push(
//             new FilterWarningsPlugin({
//                 exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
//             })
//         );
//         return config;
//     }
// }))

module.exports = {
    webpack(config, ...args) {
        config = withCss().webpack(config, ...args);
        config = withLess().webpack(config, ...args);
        config.plugins.push(
            new FilterWarningsPlugin({
                exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
            })
        );
        return config;
    }
}