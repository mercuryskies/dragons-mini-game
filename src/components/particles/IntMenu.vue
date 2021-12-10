<template>
	<div class="int menu fixed fadeIn">
		<button
			class="control circle border-outline"
			type="button"
			@click="open"
		>
			<div class="icon absolute circle bg-glare">
				<i class="far fa-bars typo-shadow"></i>
			</div>
		</button>
	</div>
</template>

<script>
export default {
	methods: {
		open()
		{
			this.$store.commit('modal/show', {
				type: 'Menu'
			});
		},
	}
}
</script>