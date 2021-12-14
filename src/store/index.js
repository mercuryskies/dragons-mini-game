require('babel-plugin-require-context-hook/register')();

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//load modules dynamically
const requireContext = require.context('./', false, /.*\.js$/);
const modules = requireContext.keys()
	.map(file => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
	.reduce((modules, [name, module]) => {
		if (module.namespaced === undefined) module.namespaced = true;
		return { ...modules, [name]: module };
	}, {});

export default new Vuex.Store({
	modules
})