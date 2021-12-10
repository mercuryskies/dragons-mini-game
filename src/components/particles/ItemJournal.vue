<template>
	<article class="iJournal block">
		<i :class="'icon absolute far typo-shadow fa-'+setIcon"/>
		<h1 class="title">{{item.msg}}</h1>
		<div class="stats typo-shadow">
			<span><i class="icon far fa-ribbon"></i>{{item.score}}</span>
			<span><i class="icon far fa-coins"></i>{{item.gold}}</span>
			<span><i class="icon far fa-heart"></i>{{item.lives}}</span>
		</div>
	</article>
</template>

<script>
export default {
	props: {
		item: Object,
	},
	computed: {
		setIcon()
		{
			return this.item.success ? 'star' : 'skull-crossbones';
		}
	},
}
</script>