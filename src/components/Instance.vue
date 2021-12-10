<template>
	<div 
		class="instance block"
		:class="[{contain: isCamp || place || location}, {withPadding: place}, game.location]"
	>
		<div class="sky absolute transition-03" v-show="!place">
			<svg class="contain" viewBox="0 0 500 150" preserveAspectRatio="none">
				<path d="M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z"></path>
			</svg>
		</div>
		<h1 class="instanceTitle centered rounded border-outline">
			<span class="typo-shadow">{{game.location}}</span>
		</h1>
		<Camp v-if="isCamp"/>
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
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Camp from '@/components/instances/Camp';
import Playground from '@/components/instances/Playground';
import PlaceItems from '@/components/instances/PlaceItems';
import PlaceChurch from '@/components/instances/PlaceChurch';

export default {
	props: {
		game: Object,
	},
	components: {
		Camp,
		Playground,
		PlaceItems,
		PlaceChurch,
	},

	computed: {
		isCamp()
		{
			return this.game.location === 'Camp';
		},
		isAlive()
		{
			return this.$store.getters['game/alive'];
		},
		location()
		{
			return this.$store.getters['game/locationInfo'];
		},
		places()
		{
			return this.$store.getters['game/places'];
		},
		place()
		{
			return this.$store.getters['game/place'];
		},
		spawns()
		{
			return this.$store.getters['game/spawns'];
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