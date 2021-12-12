<template>
	<button 
		class="iInventory button rounded noSelect" 
		type="button" 
		@click="open"
	>
		<svg class="icon">
			<use :xlink:href="'#icon-'+item.id"></use>
		</svg>
	</button>
</template>

<script>
export default {
	props: {
		item: Object,
	},
	methods: {
		open()
		{
			let { name, ...item } = this.item;
			Object.assign(item, {description: name});
			this.$set('notice/show', {
				type: 'Inventory',
				flow: item
			});
		},
	}
}
</script>