<template>
	<div class="playground block contain" v-if="setArea">
		<div 
			class="area absolute contain"
			
		>
			<div class="places absolute flex wrap evently">
				<ItemPlace 
					v-for="(item, index) in places"
					:key="index"
					:item="item"
					:location="location"
				/>
			</div>
			<div 
				class="grounds absolute flex wrap"
				
				:style="[{ 
					width: setArea.size+'px', 
					height: setArea.size+'px', 
					'margin-top': '-'+setArea.top+'px', 
					'margin-left': '-'+setArea.left+'px' 
				}]"
			>
				<div 
					class="ground noSelect"
					v-for="(ground, index) in setArea.areas"
					:key="index"
					:style="{ width: setArea.blockSize+'px', height: setArea.blockSize+'px' }"
					:class="[ ground.level ? 'lvl-'+ground.level : '', { center: ground.pos === ground.center }, 'ground_'+ground.pos ]"
					:ref="'ground_'+ground.pos"
				/>	
			</div>
			{{setSpawns}}
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

			const suburbs = [];

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

			let top = size / 2;
			let left = size / 2;

			return {
				size, 
				top,
				left,
				blockSize, 
				chunksLength,
				areas, 
				suburbs,
			};
		},
		setSpawns()
		{
			let suburbs = this.setArea?.suburbs;
			let spawns = this.spawns;
			if (!suburbs || !spawns) return;
			let randomMax = suburbs.length - 1;
			const spawnPositions = {};

			spawns.reduce((acc, v) => {
				acc++;
				let [ name, max ] = Object.entries(v)[0];
				let spawn = [...Array(max).keys()].map((o, i) => {
					let pos = suburbs[Math.floor(Math.random() * (randomMax + 1))];
					if (!spawnPositions[pos]) spawnPositions[pos] = [];
					let offset = (acc + i) * 10;
					let obj = {
						name,
						top: acc,
						left: acc,
						offset
					};
					spawnPositions[pos].push(obj);
					return;
				});
				return acc;
			},0);

			this.$nextTick(() => {
				Object.keys(spawnPositions).forEach((pos) => {
					const element = document.querySelector('.ground_'+pos);
					spawnPositions[pos].forEach((spawn) => {
						let top = spawn.top * 10;
						let left = spawn.top * 10;
						let el = `<i class="icon far fa-${spawn.name}" style="padding-top:${top}px;padding-left:${left}px;margin:${spawn.offset}px"></i>`;
						element.innerHTML += el;
					});
				});
			});

			return true;
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