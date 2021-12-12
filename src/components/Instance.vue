<template>
	<div 
		class="instance block"
		:class="[{contain: isCamp || place || location}, {withPadding: place}, game.location]"
	>
		<ParticlesStars v-show="!place"/>
		<h1 class="instanceTitle centered rounded border-outline fadeInstance">
			<span class="typo-shadow">{{game.location}}</span>
		</h1>
		<Camp 
			v-if="isCamp"
			:isAlive="isAlive"
		/>
		<Playground 
			v-if="!place && !isCamp"
			:places="places"
			:location="location"
			:spawns="spawns"
		/>
		<component 
			v-if="setPlaceComponent"
			:is="setPlaceComponent" 
			:place="setPlace" 
			:location="location"
			:isAlive="isAlive"
		/>
	</div>
</template>

<script>
import Camp from '@/components/instances/Camp';
import Playground from '@/components/instances/Playground';
import PlaceItems from '@/components/instances/PlaceItems';
import PlaceChurch from '@/components/instances/PlaceChurch';
import ParticlesStars from '@/components/particles/ParticlesStars';

export default {
	props: {
		game: Object,
	},
	components: {
		Camp,
		Playground,
		PlaceItems,
		PlaceChurch,
		ParticlesStars,
	},

	computed: {
		location()
		{
			return this.$get('game/locationInfo');
		},
		places()
		{
			return this.$get('game/places');
		},
		place()
		{
			return this.$get('game/place');
		},
		spawns()
		{
			return this.$get('game/spawns');
		},
		isAlive()
		{
			return this.$get('game/alive');
		},
		isCamp()
		{
			return this.game.location === 'Camp';
		},
		setPlace()
		{
			return this.places.filter(p => p.id === this.place)[0];
		},
		setPlaceComponent()
		{
			//available: church, hall, store 
			let { place, _slug = 'Place' } = this;
			if (!place) return;
			switch (place)
			{
				case 'church':
					_slug+='Church';
					break;
				default:
					_slug+='Items';
					break;
			}
			return this.$options.components[_slug] ? _slug : null;
		}
	},
}
</script>