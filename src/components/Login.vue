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
				type="button" 
				class="button rounded bg-glare" 
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

	methods: {
		start()
		{
			let { username, $store } = this;
			if (!username) return;
			$store.dispatch('game/start', { username });
		}
	}
}
</script>