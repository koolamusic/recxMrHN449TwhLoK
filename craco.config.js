/**
 * Setup Craco for advanced theming from https://ant.design/docs/react/use-in-typescript#Advanced-Guides
 */
const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A', '@height-base': '48px', '@border-radius-base': '2px' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};