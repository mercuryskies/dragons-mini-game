<template>
	<button 
		class="iProduct button rounded noSelect" 
		type="button" 
		@click="open"
	>
		<svg class="icon absolute">
			<use :xlink:href="'#icon-'+item.id"></use>
		</svg>
		<div class="title absolute vParent">
			<span class="vChild">{{item.name}}</span>
		</div>
		<p class="price block centered typo-shadow"><i class="icon far fa-coins"></i><span>{{item.cost}}</span></p>
	</button>
</template>

<script>
export default {
	props: {
		item: Object,
	},
	computed: {
		
	},
	methods: {
		open()
		{
			this.$store.commit('notice/show', {
				type: 'Product',
				flow: this.item
			});
		},
	}
}
</script>