<template>
	<div class="sky absolute transition-03">
		<svg class="contain" viewBox="0 0 500 150" preserveAspectRatio="none">
			<path d="M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z"></path>
		</svg>
		<div class="area">
			<span 
				class="particle absolute circle"
				v-for="(item, index) in setStars"
				:key="index"
				:class="[
					'particle_'+index,
					item.shadow ? 'shadow' : '',
					item.fallen ? 'fallen' : ''
				]"
				:style="{
					background: item,
					left: (index * 15)+3+'%',
					top: item.top+'px',
					marginLeft: item.left+'px',
					background: item.bg,
					animationDelay: index+1+'s'
				}"
			/>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		setStars()
		{
			let colors = [
				'rgba(98,79,36,.5)',
				'rgba(247,213,137,.6)',
				'rgba(255,255,255,.7)'
			];
			let count = Math.floor(Math.random() * 20);
			count = count < 5 ? 5 : count;
			return [...Array(count).keys()].reduce((acc, v) => {
				let color = Math.floor(Math.random() * 2) + 1;
				let fallen = !!(v % 3 === 0);
				let shadow = !!(color === 2);
				let star = {
					top: Math.floor(Math.random() * 50) + 10,
					left: Math.floor(Math.random() * 100) + 10,
					bg: colors[color],
					shadow,
					fallen,
				}
				acc.push(star);
				return acc;
			},[]);
		}
	}
}
</script>

<style scoped>
.area {width:100%;height:100px;top:0;left:0;z-index:700;position:absolute;opacity:.5;}
.particle {width:2px;height:2px;}
.particle.fallen {-webkit-animation:particleStar 1.5s linear infinite;-moz-animation:particleStar 1.5s linear infinite;-ms-animation:particleStar 1.5s linear infinite;animation:particleStar 1.5s linear infinite;animation-iteration-count:2;}
.particle.shadow {-webkit-box-shadow:0 0 5px 1px rgba(255,255,255,.5);-moz-box-shadow:0 0 5px 1px rgba(255,255,255,.5);box-shadow:0 0 5px 1px rgba(255,255,255,.5);}
@keyframes particleStar {
	0% {transform:translate3d(0,-150px,0);opacity:1;}
	100% {transform:translate3d(-100px,0,0);opacity:0;}
}
@-webkit-keyframes particleStar {
	0% {-webkit-transform:translate3d(0,-150px,0);opacity:1;}
	100% {-webkit-transform:translate3d(-100px,0,0);opacity:0;}
}
@-moz-keyframes particleStar {
	0% {-moz-transform:translate3d(0,-150px,0);opacity:1;}
	100% {-moz-transform:translate3d(-100px,0,0);opacity:0;}
}
@-ms-keyframes particleStar {
	0% {-ms-transform:translate3d(0,-150px,0);opacity:1;}
	100% {-ms-transform:translate3d(-100px,0,0);opacity:0;}
}

</style>