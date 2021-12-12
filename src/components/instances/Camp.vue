<template>
	<div class="instanceGuide absolute contain">
		<ParticlesStars/>
		<svg class="ground absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 320">
			<path fill-opacity="1" d="M0,128L120,112C240,96,480,64,720,53.3C960,43,1200,53,1320,58.7L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
		</svg>
		<div class="guide absolute noSelect">
			<img class="block" src="@/assets/images/Lydia.png" alt="Lydia"/>
			<div class="dialogue absolute rounded">
				<p v-if="stage > 0" v-html="setDialogue"/>
				<template v-else>
					<p>Glad to see you!</p>
					<p>I have a special gift for new travellers!</p>
					<button 
						class="button block border-outline rounded"
						type="button"
						@click="$act('game/init')"
					>
						<span class="typo-shadow">Take a bag</span>
					</button>
				</template>
			</div>
		</div>
		<div class="bonfire absolute noSelect">
			<img class="block" src="@/assets/images/bonfire.png" alt="Lydia" style="z-index:6"/>
			<ParticlesFire/>			
		</div>
	</div>
</template>

<script>
import ParticlesStars from '@/components/particles/ParticlesStars';
import ParticlesFire from '@/components/particles/ParticlesFire';

export default {
	props: {
		isAlive: Boolean
	},
	components: {
		ParticlesStars,
		ParticlesFire,
	},

	computed: {
		stage()
		{
			return this.$get('game/stage');
		},
		location()
		{
			return this.$get('game/locationInfo');
		},
		setDialogue()
		{
			let { isAlive, stage, _out = '' } = this;
			if (!isAlive) return 'I have no words...';
			switch (stage)
			{
				case 1:
					_out = 'Now you ready! <br>Be careful';
					break;
				default:
					_out = 'You know... Luck is a curious thing';
					break;
			}
			return _out;
		}
	},
}
</script>