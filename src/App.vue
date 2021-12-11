<template>
	<div id="app">
		<SvgSprites/>
		<RouterView/>
		<Modal/>
		<Notice/>
	</div>
</template>

<script>
import SvgSprites from '@/components/particles/SvgSprites';
import Modal from '@/components/Modal';
import Notice from '@/components/Notice';

export default {
	el: '#app',

	metaInfo: () => ({
		title: 'Dragons of Mugloar',
		meta: [
			{ name: 'description', content: 'Mini game'},
			{ property: 'og:title', content: 'Dragons of Mugloar'},
			{ property: 'og:description', content: 'Mini game'},
			{ property: 'og:image', content: '@/assets/images/Camp.jpg' }    
		]
	}),

	components: {
		SvgSprites,
		Modal,
		Notice,
	},
}
</script>

<style>
@import './assets/css/luckyprod.css';
@import './assets/css/app.css';
@import './assets/css/mobile.css';
@import './assets/fonts/fa/css/fontawesome.css';
@import './assets/fonts/fa/css/regular.css';
</style>
