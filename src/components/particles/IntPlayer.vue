<template>
	<div class="int player fixed fadeIn">
		<button
			class="control circle border-outline"
			type="button"
			@click="open"
		>
			<div class="avatar bg absolute circle">
				<div class="overlay absolute contain circle bg-glare-dark"></div>
			</div>
		</button>
		<button 
			class="health absolute border-outline"
			type="button"
			@click="open"
		>
			<div class="icon absolute circle bg-glare">
				<i class="far fa-heart typo-shadow"></i>
			</div>
			<HealthBar 
				class="absolute" 
				:lives="setLives" 
				v-if="setLives > 0"
			/>
			<i v-else class="death far fa-skull-crossbones"></i>
		</button>
		@Username
	</div>
</template>

<script>
import HealthBar from './HealthBar';

export default {
	props: {
		game: Object,
	},
	components: {
		HealthBar,
	},

	computed: {
		setLives()
		{
			return this.game?.lives ?? 0;
		}
	},

	methods: {
		open()
		{
			this.$store.commit('modal/show', {
				type: 'Player'
			});
		},
	}
}
</script>