<template>
	<div class="area">
		<span 
			class="particle absolute"
			v-for="(item, index) in setFire"
			:key="index"
			:class="'particle_'+index"
			:style="{
				background: item,
				left: index * 5+'px',
				bottom: index * 10+'px',
				animationDelay: index+'s'
			}"
		/>
	</div>
</template>

<script>
export default {
	computed: {
		setFire()
		{
			return [
				'rgba(230,186,81,.6)',
				'rgba(227,111,.2)',
				'rgba(247,213,137,.5)',
				'rgba(230,186,81,.6)',
			]
		}
	}
}
</script>

<style scoped>
.area {width:50px;height:100px;bottom:40px;left:35px;z-index:700;position:absolute;}
.particle {width:2px;height:2px;bottom:0;-webkit-box-shadow:0 0 10px 5px rgba(232,186,69,.25);-moz-box-shadow:0 0 10px 5px rgba(232,186,69,.25);box-shadow:0 0 10px 7px rgba(232,186,69,.25);}
.particle {-webkit-animation:particle 1.5s linear infinite;-moz-animation:particle 1.5s linear infinite;-ms-animation:particle 1.5s linear infinite;animation:particle 1.5s linear infinite;}
@keyframes particle {
	0% {transform:translateY(0);opacity:0;}
	1% {transform:translateY(0);opacity:1;}
	100% {transform:translateY(-50px);opacity:0;}
}
@-webkit-keyframes fadeInstance {
	0% {-webkit-transform:translateY(0);opacity:0;}
	1% {-webkit-transform:translateY(0);opacity:1;}
	100% {-webkit-transform:translateY(-50px);opacity:0;}
}
@-moz-keyframes fadeInstance {
	0% {-moz-transform:translateY(0);opacity:0;}
	1% {-moz-transform:translateY(0);opacity:1;}
	100% {-moz-transform:translateY(-50px);opacity:0;}
}
@-ms-keyframes fadeInstance {
	0% {-ms-transform:translateY(0);opacity:0;}
	1% {-ms-transform:translateY(0);opacity:1;}
	100% {-ms-transform:translateY(-50px);opacity:0;}
}
</style>