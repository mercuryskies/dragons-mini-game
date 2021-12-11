<template>
	<div 
		class="iTask block"
	>
		<svg class="icon absolute">
			<use :xlink:href="'#icon-'+setIcon"></use>
		</svg>
		<div class="inner block vParent">
			<div class="vChild">
				<h1 class="title">{{item.message}}</h1>
			</div>
		</div>
		<div class="info absolute">
			<button
				class="button block rounded border-outline"
				type="button"
				@click="take"
			>
				<span class="absolute bg-glare rounded"><b class="typo-shadow">Try</b></span>
			</button>
			<div class="flex between typo-shadow">
				<span><i class="icon far fa-clock"></i>{{item.expiresIn}}</span>
				<span><i class="icon far fa-coins"></i>{{item.reward}}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		item: Object,
	},
	computed: {
		setIcon()
		{
			/*
			Sure thing
			Walk in the park
			Piece of cake
			Quite likely
			Risky
			*/

			let { probability = 'Sure thing', _out = '' } = this.item;
			switch (this.item.probability)
			{
				case 'Sure thing':
					_out+= 'ok';
					break;
				case 'Walk in the park':
					_out+= 'walk';
					break;
				case 'Piece of cake':
					_out+= 'cake';
					break;
				default:
					_out+= 'dice';
					break;
			}
			return _out;
		}
	},
	methods: {
		take()
		{
			this.$store.dispatch('tasks/solve', this.item);
		},
	}
}
</script>