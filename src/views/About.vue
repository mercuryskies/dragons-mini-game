<template>
	<div class="home about absolute contain centered vParent">
		<a 
			class="link absolute left rounded"
			href="#"
			@click.prevent="$router.go(-1)"
		>
			<span class="typo-shadow">Back</span>
		</a>
		<div class="vChild typo-shadow">
			<p><a href="https://github.com/mercuryskies" target="_blank">https://github.com/mercuryskies</a></p>
			<p>Created by @mercuryskies as a test assignment</p>
		</div>
	</div>
</template>