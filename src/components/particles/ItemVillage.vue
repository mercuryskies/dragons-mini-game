<template>
	<button 
		move-disabled="true"
		class="iMapVillage button absolute noSelect" 
		type="button" 
		@click="teleport"
	>
		<i :class="'icon far fa-'+item.icon"/>
		<i v-if="item.name === location" class="iconLocation absolute far fa-times"/>
		<h2 class="title absolute">{{item.name}}</h2>
		<div class="info absolute" v-if="item.items.length">
			<i class="icon far fa-scroll"></i>
			<span class="absolute centered circle">{{item.items.length}}</span>
		</div>
	</button>
</template>

<script>
export default {
	props: {
		item: Object,
		index: Number,
		location: String
	},
	methods: {
		teleport()
		{
			this.$store.dispatch('game/teleport', this.item.name);
		},
	}
}
</script>