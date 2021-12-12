<template>
	<button 
		class="iPlace button noSelect" 
		type="button" 
		:class="item.id"
		@click="enter"
	>
		<i :class="'icon far fa-'+item.icon"/>
		<h3 class="title">{{setTitle}}</h3>
		<i v-if="item.id === 'hall'" class="info far fa-info absolute centered circle"></i>
		<i 
			class="far fa-snooze"
			v-if="!isOpen"
		/>
	</button>
</template>

<script>
export default {
	props: {
		item: Object,
		location: Object,
	},
	computed: {
		isOpen()
		{
			return this.item.open ?? false;
		},
		setDetails()
		{
			let { item, location } = this;
			return item?.details?.[location?.title] ?? false;
		},
		setTitle()
		{
			return this.setDetails?.title ?? this.item.title;
		},
		setDescription()
		{
			return this.setDetails?.description ?? this.item.description;
		},
		hasDescription()
		{
			return !!this.setDescription;
		}
	},
	methods: {
		enter()
		{
			if (this.isOpen) return this.$set('game/enterPlace', this.item.id);
			if (this.hasDescription) 
			{
				let { description, ...item } = this.item;
				Object.assign(item, { description: this.setDescription });
				this.$set('notice/show', {
					type: 'Building',
					flow: item
				});
			}
		},
	}
}
</script>