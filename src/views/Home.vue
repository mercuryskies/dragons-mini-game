<template>
	<div class="layout">
		<Login v-if="!isStarted"/>
		<Game v-else/>
	</div>
</template>

<script>
import Login from '@/components/Login.vue';
import Game from '@/components/Game.vue';

export default {
	name: 'Home',
	components: {
		Login,
		Game,
	},
	
	computed: {
		isStarted()
		{
			return this.$store?.getters?.['game/started'] ?? false;
		}
	}
}
</script>
