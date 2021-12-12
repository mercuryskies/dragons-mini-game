<template>
	<div class="modal menu" id="menu">
		<ModalHeader title="Menu" icon="bars"/>
		<div class="inner contain border-outline">
			<div class="links centered">
				<button
					class="button block rounded border-outline"
					type="button"
					v-for="(title, action) in menu"
					:key="action"
					@click="handle(action)"
				>
					<span class="typo-shadow">{{title}}</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import ModalHeader from '@/components/particles/ModalHeader';

export default {
	props: {
		flow: [String, Object]
	},
	components: {
		ModalHeader,
	},

	data: () => ({
		menu: {
			about: 'About',
			start: 'Start a new Game',
			end: 'End Game',
		},
	}),

	methods: {
		handle(action)
		{
			switch (action)
			{
				case 'about':
					this.$set('modal/hide');
					this.$router.push('about');
					break;
				case 'start':
					this.$act('game/end');
					break;
				case 'end':
					this.$act('game/end');
					break;
			}
		}
	}
}
</script>