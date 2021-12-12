<template>
	<div 
		class="gameArea"
		:class="{grayscale : !isAlive}"
	>
		<template v-if="!isTeleporting">
			<IntPlayer :game="game"/>
			<IntMenu/>
			<IntInventory v-if="stage > 0"/>
			<IntQuests/>
			<IntMap v-if="stage > 0"/>
			<Instance :game="game"/>
		</template>
		<Teleport v-else/>
	</div>
</template>

<script>
import IntPlayer from '@/components/particles/IntPlayer';
import IntMenu from '@/components/particles/IntMenu';
import IntInventory from '@/components/particles/IntInventory';
import IntQuests from '@/components/particles/IntQuests';
import IntMap from '@/components/particles/IntMap';
import Instance from '@/components/Instance';
import Teleport from '@/components/Teleport';

export default {

	components: {
		IntPlayer,
		IntMenu,
		IntInventory,
		IntQuests,
		IntMap,
		Instance,
		Teleport,
	},

	computed: {
		stage()
		{
			return this.$get('game/stage');
		},
		isAlive()
		{
			return this.$get('game/alive');
		},
		isTeleporting()
		{
			return this.$get('game/teleporting');
		},
		game()
		{ 
			return this.$get('game/data');
		}
	},
}
</script>