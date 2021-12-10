import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

import Vuebar from 'vuebar';
Vue.use(Vuebar);

import movable from 'v-movable';
Vue.use(movable);


Vue.config.productionTip = false;

const app = new Vue({
	router,
	store,
	...App
});
