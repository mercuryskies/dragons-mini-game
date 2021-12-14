<template>
	<div class="placeHeader absolute centered rounded border-outline">
		<div 
			class="icon absolute circle border-outline" 
			v-if="place.icon"
		>
			<i v-if="place.icon" :class="'typo-shadow far fa-'+place.icon"/>
		</div>
		<button 
			class="button absolute rounded border-outline noSelect" 
			type="button" 
			@click="$set('game/leavePlace')"
		>
			<div class="typo-shadow">
				<span>Leave</span>
				<i class="icon absolute far fa-portal-exit transition-03"></i>
			</div>
		</button>
		<h1 class="title typo-shadow">{{setTitle}}</h1>
	</div>
</template>

<script>
export default {
	props: {
		place: Object,
		location: Object
	},
	computed: {
		setTitle()
		{
			let { place, location } = this;
			return place.id === 'hall' 
				? place.title 
				: location.title+' '+place.title;
		}
	},
}
</script>