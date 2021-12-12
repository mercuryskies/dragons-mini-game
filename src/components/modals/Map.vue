<template>
	<div class="modal map">
		<ModalHeader title="World Map" icon="map"/>
		<div class="inner contain border-outline">
			<img src="@/assets/images/logo.png" class="logo absolute grayscale"/>
			<div class="villages" v-if="villages && villages.length">
				<ItemVillage
					v-for="(item, index) in villages"
					:key="index"
					:item="item"
					:index="index"
					:location="location"
					:style="setPosition(index)"
				/>
			</div>
			<template v-if="parts && parts.length">
				<i 
					class="part absolute far"
					v-for="([top, left, icon], index) in parts"
					:key="index"
					:class="'fa-'+icon"
					:style="{top: top+'%', left: left+'%'}"
				/>
			</template>
		</div>
	</div>
</template>

<script>
import ModalHeader from '@/components/particles/ModalHeader';
import ItemVillage from '@/components/particles/ItemVillage';

export default {
	props: {
		flow: [String, Object]
	},
	components: {
		ModalHeader,
		ItemVillage,
	},

	data: () => ({
		parts: [
			[10,15,'tree'],
			[20,10,'tree'],
			[5,5,'tree'],
			[24,80,'tree'],
			[60,15,'tree'],
			[7,80,'trees'],
			[15,58,'trees'],
			[50,88,'trees'],
			[35,34,'trees'],
			[85,5,'tree'],
			[80,50,'trees'],
			[90,80,'trees'],
		]
	}),

	computed: {
		location()
		{
			return this.$get('game/location');
		},
		villages()
		{
			return this.$get('tasks/byVillage');
		},
	},

	methods: {
		setPosition(index)
		{
			let output;
			switch (index)
			{
				case 1:
					output = { bottom: 20+'%', left: 30+'%' };
					break;
				case 2:
					output = { bottom: 23+'%', right: 25+'%' };
					break;
				case 3:
					output = { top: 50+'%', left: 50+'%' };
					break;
				default:
					output = { top: 30+'%', left: 15+'%' };
					break;
			}
			return { ...output };
		}
	}
}
</script>