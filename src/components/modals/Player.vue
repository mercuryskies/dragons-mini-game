<template>
	<div class="modal player default" v-if="game" id="player">
		<ModalHeader title="Player Stats" icon="user-ninja"/>
		<div class="inner contain border-outline">
			<div class="top absolute">
				<h1 class="username typo-shadow">{{game.username}}</h1>
				<div class="health">
					<HealthBar 
						class="absolute contain" 
						:lives="setLives" 
						v-if="setLives > 0"
					/>
				</div>
			</div>
			<div 
				v-bar
				class="container block contain flex start wrap"
			>
				<div>
					<div class="reputation">
						<h2 class="title typo-shadow">Stats</h2>
						<div
							class="stat flex end"
							v-for="(value, stat) in setStats"
							:key="stat"
						>
							<b class="capitalize">{{stat}}</b> <span>{{value}}</span>
						</div>
					</div>
					<div class="reputation" v-if="game.reputation">
						<h2 class="title typo-shadow">Reputation</h2>
						<div
							class="stat flex end"
							v-for="(value, stat) in game.reputation"
							:key="stat"
						>
							<b class="capitalize">{{stat}}</b> <span>{{Math.round(value * 100) / 100}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { pick } from '@/utils';
import ModalHeader from '@/components/particles/ModalHeader';
import HealthBar from '@/components/particles/HealthBar';

export default {
	props: {
		flow: [String, Object]
	},
	components: {
		ModalHeader,
		HealthBar,
	},

	computed: {
		game()
		{
			return this.$store.getters['game/data'];
		},
		setLives()
		{
			return this.game?.lives ?? 0;
		},
		setStats()
		{
			return pick(this.game, ['level', 'score', 'highScore', 'turn']);
		}
	}
}
</script>