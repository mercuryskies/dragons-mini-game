<template>
	<div class="place items block">
		<div class="inner rounded">
			<PlaceHeader :place="place" :location="location"/>
			<div class="items block border-outline rounded">
				<div 
					v-bar
					class="container block contain"
					v-if="setItemComponent && isAlive"
					:class="[isGrid ? ['flex','start','wrap'] : '']"
				>
					<div v-if="setItems.length">
						<component
							v-for="(item, index) in setItems"
							:is="setItemComponent"
							:key="index"
							:item="item"
						/>
					</div>
					<h1 v-else class="note centered">{{place.id === 'hall' ? 'Try your luck in another village...' : 'Nothing to show'}}</h1>
				</div>
				<h1 v-else class="note centered">Why do the zombies in walking dead need to eat</h1>
			</div>
		</div>
	</div>
</template>

<script>
import PlaceHeader from '@/components/particles/PlaceHeader';
import ItemProduct from '@/components/particles/ItemProduct';
import ItemTask from '@/components/particles/ItemTask';

export default {
	props: {
		place: Object,
		location: Object,
	},
	components: {
		PlaceHeader,
		ItemProduct,
		ItemTask,
	},
	computed: {
		isAlive()
		{
			return this.$get('game/alive');
		},
		isGrid()
		{
			return this.place.id === 'store';
		},
		setItems()
		{
			let { id: source } = this.place;
			if (!source) return;
			return this.$store.getters['game/getItems'](source) ?? [];
		},
		setItemComponent()
		{
			let { id, _slug = 'Item' } = this.place;
			if (!id) return;
			switch (id)
			{
				case 'hall':
					_slug+='Task';
					break;
				case 'store':
					_slug+='Product';
					break;
			}
			return this.$options.components[_slug] ? _slug : null;
		},
	}
}
</script>