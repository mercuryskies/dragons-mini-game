<template>
	<div class="int menu fixed fadeIn">
		<button
			class="control circle border-outline noSelect"
			type="button"
			@click="$set('modal/show', {
				type: 'Menu'
			})"
		>
			<div class="icon absolute circle bg-glare">
				<i class="far fa-bars typo-shadow"></i>
			</div>
		</button>
	</div>
</template>