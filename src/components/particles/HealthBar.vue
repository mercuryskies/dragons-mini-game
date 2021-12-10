<template>
	<div 
		class="bar centered flex between"
		:style="{'padding-right':setPadding+'px'}"
	>
		<div class="absolute contain bg-glare-dark"></div>
		<span 
			v-for="(live, index) in lives"
			:key="index"
			:class="{additional : index > 2}"
		/>
	</div>
</template>

<script>
export default {
	props: {
		lives: Number
	},
	computed: {
		setPadding()
		{
			let { lives } = this;
			if (lives >= 3) return 0;
			return lives === 2 ? 50 : 80;
		}
	}
}
</script>