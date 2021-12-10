<template>
	<div 
		class="noticeArea fixed contain" 
		v-show="isOpened" 
		:class="{ opened: isOpened }"
	>
		<button 
			class="overlay fixed contain noSelect"
			type="button" 
			@click="hide"
		/>
		<div class="notice absolute rounded border-outline">
			<button 
				class="button btnClose absolute typo-shadow noSelect"
				type="button" 
				@click="hide"
			>
				<i class="icon far fa-times"></i>
			</button>
			<div class="inner block centered">
				<svg 
					class="iconBig" 
					v-if="isTeleport"
				>
					<use xlink:href="#icon-teleport"></use>
				</svg>
				<svg 
					class="iconBig" 
					v-if="isProduct || isInventory"
				>
					<use :xlink:href="'#icon-'+flow.id"></use>
				</svg>
				<i v-if="isBasic && flow.icon" :class="'icon far fa-'+flow.icon"/>
				<h1 v-if="setTitle">{{setTitle}}</h1>
				<p v-if="setDescription">{{setDescription}}</p>
				<p v-if="isProduct || isInventory" class="typo-shadow"><i class="icon far fa-coins"></i><span>{{flow.id === 'teleport' ? '∞' : flow.cost}}</span></p>
				<button
					class="button btnHandle rounded noSelect"
					type="button"
					@click="handle"
					:class="[isBasic ? 'border-outline' : 'bg-glare']"
				>
					<span class="typo-shadow">{{setButtonText}}</span>
				</button>
			</div>
		</div>
		<!--***-->
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters({
			isOpened: 'notice/opened',
			type: 'notice/type',
			flow: 'notice/flow'
		}),
		checkType()//TODO
		{
			return !!this.$options.components?.[this.type ?? null];
		},
		isBasic()
		{
			return ['Building', 'Inventory', 'Task', 'Purchase'].includes(this.type);
		},
		isTeleport()
		{
			return this.type === 'Teleport';
		},
		isProduct()
		{
			return this.type === 'Product';
		},
		isPurchase()
		{
			return this.type === 'Purchase';
		},
		isInventory()
		{
			return this.type === 'Inventory';
		},
		isTask()
		{
			return this.type === 'Task';
		},
		setTitle()
		{
			let { isBasic, isTeleport, isProduct, isPurchase, isTask, _out = '' } = this;
			let { title } = this.flow;
			if (isBasic && title) _out+=title;
			if (isTeleport) _out+='Teleport to '+this.flow+'?';
			if (isProduct) _out+=this.flow.name;
			if (isPurchase) _out = this.flow.shoppingSuccess ? 'Successful purchase' : 'Not today!';
			if (isTask) _out+=this.flow.message;
			return _out;
		},
		setDescription()
		{
			return this.flow?.description ?? null;
		},
		setButtonText()
		{
			let { flow, isBasic, isTeleport, isProduct, isPurchase, isTask, _out = '' } = this;
			if (isBasic) _out = 'Ok';
			if (isTeleport) _out = 'Teleport';
			if (isProduct) _out+='Buy';
			if (isPurchase)
			{
				_out = flow.shoppingSuccess === true ? 'I like it!' : 'I guess...';
			}
			if (isTask)
			{
				_out = flow.success === true ? 'Thank you!' : 'Ok then...';
			}
			return _out;
		}
	},

	methods: {
		handle()
		{
			if (this.isBasic) return this.hide();
			this.$store.dispatch('notice/handle');
		},
		hide()
		{
			this.$store.commit('notice/hide');
		}
	}
}
</script>