<template>
	<div class="header absolute centered border-outline rounded">
		<div class="iconWrapper absolute circle centered border-outline">
			<div class="icon absolute circle bg-glare">
				<i 
					class="far typo-shadow" 
					:class="icon ? 'fa-'+icon : 'fa-star'"
				/>
			</div>
		</div>
		<h1 class="title typo-shadow">{{title}}</h1>
		<button 
			class="button btnClose absolute centered" 
			type="button"
			@click="hide"
		>
			<i class="icon far fa-times typo-shadow"></i>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		title: String,
		icon: String
	},

	methods: {
		hide()
		{
			this.$store.commit('modal/hide');
		}
	}
}
</script>