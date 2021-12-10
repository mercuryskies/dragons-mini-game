<template>
	<button 
		class="iInventory button rounded noSelect" 
		type="button" 
		@click="open"
	>
		<svg class="icon block">
			<use :xlink:href="'#icon-'+item.id"></use>
		</svg>
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
			let { name, ...item } = this.item;
			Object.assign(item, {description: name});
			this.$store.commit('notice/show', {
				type: 'Inventory',
				flow: item
			});
		},
	}
}
</script>