<template>
	<div class="instanceGuide absolute contain">
		<div class="sky absolute">
			<svg class="contain" viewBox="0 0 500 150" preserveAspectRatio="none">
				<path d="M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z"></path>
			</svg>
		</div>
		<svg class="ground absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 320">
			<path fill="#1e363f" fill-opacity="1" d="M0,128L120,112C240,96,480,64,720,53.3C960,43,1200,53,1320,58.7L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
		</svg>
		<div class="guide absolute">
			<img class="block" src="@/assets/images/Lydia.png" alt="Lydia"/>
			<div class="dialogue">
				<p>Glad to see you again.</p>
				<p>W</p>
			</div>
		</div>
		<div class="bonfire absolute">
			<img class="block" src="@/assets/images/bonfire.png" alt="Lydia"/>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		location()
		{
			return this.$store.getters['game/locationInfo'];
		},
	},

	methods: {
		open()
		{
			this.$store.commit('modal/show', {
				type: 'Map'
			});
		},
	}
}
</script>