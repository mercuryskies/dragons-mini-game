import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Vuebar from 'vuebar';
Vue.use(Vuebar);

import VueMeta from 'vue-meta';
Vue.use(VueMeta);

Vue.prototype.$get = (type) => store.getters[type];
Vue.prototype.$set = (type, data) => store.commit(type, data);
Vue.prototype.$act = (type, data) => store.dispatch(type, data);

Vue.config.productionTip = false;

const app = new Vue({
	router,
	store,
	...App
});
