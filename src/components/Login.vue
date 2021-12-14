<template>
	<div class="home login absolute contain centered vParent">
		<RouterLink 
			class="link absolute right rounded" 
			to="about"
		>
			<span class="typo-shadow">Credits</span>
		</RouterLink>

		<div class="vChild">
			<span class="typo-shadow">Welcome to the</span>
			<h1 class="logo">
				<img src="@/assets/images/logo.png" class="grayscale" alt="Dragons of Mugloar"/>
			</h1>
			<input 
				class="input block centered rounded"
				type="text" 
				v-model="username" 
				placeholder="Choose your name" 
				@keyup.enter="start"
			/>
			<button 
				type="submit" 
				class="button rounded bg-glare noSelect" 
				@click="start"
			>
				<span class="typo-shadow">Enter</span>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		username: '',
	}),

	mounted()
	{
		this.username = this.$get('game/username') ?? '';
	},

	methods: {
		start()
		{
			let { username, $act } = this;
			if (!username) return;
			return $act('game/start', { username });
		}
	}
}
</script>