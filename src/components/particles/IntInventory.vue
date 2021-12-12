<template>
	<div class="int inventory fixed">
		<button
			class="control circle border-outline"
			type="button"
			@click="open"
		>
			<div class="icon absolute circle bg-glare">
				<i class="far fa-sack typo-shadow"></i>
			</div>
		</button>
		<button 
			class="button absolute"
			type="button"
			@click="open"
		>
			<i class="icon far fa-coins typo-shadow"></i>
			<span>{{inventory.gold}}</span>
		</button>
	</div>
</template>

<script>
export default {
	computed: {
		inventory()
		{
			return this.$get('game/inventory');
		},
	},

	methods: {
		open()
		{
			this.$set('modal/show', {
				type: 'Inventory'
			});
		},
	}
}
</script>