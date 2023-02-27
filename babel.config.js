const path = require('path');

module.exports = function (api) {
    api.cache(false);

    return {
        moduleIds: true,
        getModuleId: function(moduleName) {
            return moduleName.replace(path.join(process.cwd(), 'src') + path.sep, '');
        },

        plugins: [
            'system-import-transformer',
        ],
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: "amd",
                    useBuiltIns: false,
                }
            ],
        ],
    };
};
