<template>
	<button 
		move-disabled="true"
		class="iMapVillage button absolute noSelect" 
		type="button" 
		@click="$act('game/teleport', item.name)"
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
}
</script>