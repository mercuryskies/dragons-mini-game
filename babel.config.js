module.exports = function(api) {
	api.cache(true);
	const presets = [
        '@vue/cli-plugin-babel/preset'
    ];
    const plugins = [];
    if (process.env.NODE_ENV === 'test') 
    {
        plugins.push('@babel/plugin-proposal-nullish-coalescing-operator', '@babel/plugin-proposal-optional-chaining', 'require-context-hook');
    }
    return {
        presets,
        plugins
    };
}
