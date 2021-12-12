<template>
	<div class="place absolute contain centered vParent">
		<div class="inner vChild">
			<div class="intro">
				<i class="icon far fa-church"></i>
				<h1 v-if="setTitle">{{setTitle}}</h1>
				<p v-if="setDescription">{{setDescription}}</p>
			</div>
			<div class="controls block flex between">
				<button
					v-if="isAlive"
					class="button rounded border-outline"
					type="button"
					@click="pray"
				><span class="typo-shadow">Pray</span></button>
				<button
					class="button rounded border-outline"
					type="button"
					@click="leave"
				><span class="typo-shadow">Leave</span></button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		isAlive: Boolean,
		place: Object,
		location: Object
	},

	computed: {
		setDetails()
		{
			let { place, location } = this;
			return place?.details?.[location?.title] ?? false;
		},
		setTitle()
		{
			return this.setDetails?.title ?? this.place.title;
		},
		setDescription()
		{
			return this.setDetails?.description ?? this.place.description;
		}
	},

	methods: {
		pray()
		{
			const player = document.getElementById('playerControl');
			if (!player) this.leave();
			player.classList.add('prayed');
			setTimeout(() => {
				player.classList.remove('prayed');
				this.leave();
			}, 500);
		},
		leave()
		{
			this.$set('game/leavePlace');
		}
	}
}
</script>