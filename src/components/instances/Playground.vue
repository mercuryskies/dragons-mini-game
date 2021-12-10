<template>
	<div class="playground block contain" v-if="setArea">
		<div 
			class="area absolute contain"
			
		>
		<!--:style="{ width: setArea.size+'px', height: setArea.size+'px'  }"-->
			<div 
				class="places absolute flex wrap evently"
				style="top:50%;left:50%;margin-left:-130px;margin-top:-130px;"

			>
				<ItemPlace 
					v-for="(item, index) in places"
					:key="index"
					:item="item"
					:location="location"
				/>

				<!--{{spawns}}-->
			</div>



			<!--:style="{ top: setArea.center.y+'px', left: setArea.center.x+'px' }"-->

			<div 
				class="grounds absolute flex wrap"
				:posTop="'-'+setArea.fix.y" 
				:posLeft="'-'+setArea.fix.x"
				:style="{ width: setArea.size+'px', height: setArea.size+'px'  }"
			>
				<div 
					class="ground noSelect"
					v-for="(ground, index) in setArea.areas"
					:key="index"
					:style="{ width: setArea.blockSize+'px', height: setArea.blockSize+'px' }"
					:class="[ ground.level ? 'lvl-'+ground.level : '', { center: ground.pos === ground.center } ]"
					:ref="'ground-'+ground.pos"
				/>	
			</div>
		</div>
	</div>
</template>

<script>
import ItemPlace from '@/components/particles/ItemPlace';

export default {
	props: {
		places: Array,
		spawns: Array,
		location: Object,
	},
	components: {
		ItemPlace,
	},

	data: () => ({
		test: {
			x: '',
			y: ''
		}
	}),

	computed: {
		setArea()
		{
			let blockSize = 260;
			let { innerWidth, innerHeight } = window;
			let maxWindow = Math.trunc(Object.values({ innerWidth, innerHeight })
				.sort((a, b) => b - a)[0]);
			let chunksLength = Math.trunc(maxWindow / blockSize);
			chunksLength = chunksLength + (!this.isOdd(chunksLength) ? 5 : 4);
			let size = chunksLength * blockSize;

			let suburbs = [];

			let areas = [...Array(chunksLength * chunksLength).keys()].reduce((acc, v) => {
				let pos = v + 1;
				let center = Math.ceil(chunksLength * chunksLength / 2);
				let offset = ((chunksLength - 1) / 2);
				let double = offset * 2;
				let level;
				if (pos === center) level = 0;
				if ((pos === center - 1 || pos === center + 1) 
					|| (pos <= center - double && pos > center - double - 3)
					|| (pos > center + double - 1 && pos < center + double + 3)
				){
					level = 1;
					suburbs.push(pos);
				}
				let area = {
					level,
					pos,
					center
				};
				if (!acc[v]) acc.push(area);
				return acc;
			},[]);

			let center = {
				//x: (size - blockSize) / 2,
				//y: (size - blockSize) / 2
				x: size,
				y: (size - blockSize) / 2
			};

			let fix = {
				x: ((size - innerWidth) / 2),
				y: (size - innerHeight + blockSize) / 2
			};

			return {
				size, blockSize, areas, suburbs, center, fix
			};
		},
		setSpawns()
		{
			let suburbs = this.setArea?.suburbs;
			let spawns = this.spawns;
			if (!suburbs || !spawns) return;
			return [];

			//return spawns.reduce((acc, v) => {
			//	return acc;
			//},[]);
		}
	},

	methods: {
		open()
		{
			this.$store.commit('modal/show', {
				type: 'Quests'
			});
		},
		isOdd(num)
		{
			return !!(num & 1);
		}
	}
}
</script>