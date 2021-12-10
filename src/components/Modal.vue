<template>
	<div 
		class="modalArea fixed contain" 
		v-show="isOpened" 
		:class="{ opened: isOpened }"
	><div class="modalInner fixed contain">
		<button 
			class="overlay fixed contain noSelect"
			type="button" 
			@click="hide"
		/>
		<component v-if="checkType" :is="type" :flow="flow"/>
	</div></div>
</template>

<script>
import { mapGetters } from 'vuex';
import Player from '@/components/modals/Player';
import Menu from '@/components/modals/Menu';
import Inventory from '@/components/modals/Inventory';
import Quests from '@/components/modals/Quests';
import Map from '@/components/modals/Map';

export default {
	components: {
		Player,
		Menu,
		Inventory,
		Quests,
		Map,
	},

	computed: {
		...mapGetters({
			isOpened: 'modal/opened',
			type: 'modal/type',
			flow: 'modal/flow'
		}),
		checkType()
		{
			return (this.$options.components?.[this.type ?? null]);
		}
	},

	methods: {
		hide()
		{
			this.$store.commit('modal/hide');
		}
	}
}
</script>