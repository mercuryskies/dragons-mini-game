<template>
	<div class="int quests fixed fadeIn">
		<button
			class="control circle border-outline"
			type="button"
			@click="open"
		>
			<div class="icon absolute circle bg-glare">
				<i class="far fa-medal typo-shadow"></i>
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
				type: 'Quests'
			});
		},
	}
}
</script>