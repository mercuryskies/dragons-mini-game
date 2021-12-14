<template>
	<div class="int map fixed fadeIn">
		<button
			class="control circle border-outline noSelect"
			type="button"
			@click="open"
		>
			<div class="icon absolute circle bg-glare">
				<i class="far fa-map typo-shadow"></i>
			</div>
		</button>
		<button 
			class="button absolute noSelect"
			type="button"
			@click="open"
		>
			<i :class="'icon far typo-shadow fa-'+location.icon"/>
			<span>{{location.title}}</span>
		</button>
	</div>
</template>

<script>
export default {
	computed: {
		location()
		{
			return this.$get('game/locationInfo');
		},
	},

	methods: {
		open()
		{
			this.$set('modal/show', {
				type: 'Map'
			});
		},
	}
}
</script>