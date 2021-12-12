<template>
	<div 
		class="modalArea fixed contain" 
		v-show="isOpened" 
		:class="{ opened: isOpened, grayscale : !isAlive }"
	><div class="modalInner fixed contain">
		<button 
			class="overlay fixed contain noSelect"
			type="button" 
			@click="$set('modal/hide')"
		/>
		<component v-if="checkType" :is="type" :flow="flow"/>
	</div></div>
</template>

<script>
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
		isAlive()
		{
			return this.$get('game/alive');
		},
		isOpened()
		{
			return this.$get('modal/opened');
		},
		type()
		{
			return this.$get('modal/type');
		},
		flow()
		{
			return this.$get('modal/flow');
		},
		checkType()
		{
			return (this.$options.components?.[this.type ?? null]);
		}
	},
}
</script>