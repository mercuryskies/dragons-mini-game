<template>
	<div class="modal inventory default" v-if="inventory">
		<ModalHeader title="Inventory" icon="sack"/>
		<div class="inner contain border-outline">
			<div 
				v-bar
				v-if="inventory.items.length"
				class="container block contain flex start wrap"
			>
				<div>
					<ItemInventory
						v-for="(item, index) in inventory.items"
						:key="index"
						:item="item"
					/>
				</div>
			</div>
			<h1 v-else class="note centered">Empty bag</h1>
		</div>
		<div class="gold absolute rounded border-outline noSelect">
			<span class="typo-shadow"><i class="icon far fa-coins"></i>{{inventory.gold}}</span>
		</div>
	</div>
</template>

<script>
import ModalHeader from '@/components/particles/ModalHeader';
import ItemInventory from '@/components/particles/ItemInventory';

export default {
	props: {
		flow: [String, Object]
	},
	components: {
		ModalHeader,
		ItemInventory,
	},

	computed: {
		isEmpty()
		{
			return this.inventory.items.length;
		},
		inventory()
		{
			return this.$store.getters['game/inventory'];
		},
	},
}
</script>