<template>
	<div class="int quests fixed fadeIn">
		<button
			class="control circle border-outline noSelect"
			type="button"
			@click="$set('modal/show', {
				type: 'Quests'
			})"
		>
			<div class="icon absolute circle bg-glare">
				<i class="far fa-medal typo-shadow"></i>
			</div>
		</button>
	</div>
</template>