<template>
	<div class="modal quests default">
		<ModalHeader title="Journal" icon="medal"/>
		<div class="inner contain border-outline">
			<div 
				v-bar
				v-if="journal.length"
				class="container block contain flex start wrap"
			>
				<div>
					<ItemJournal
						v-for="(item, index) in journal"
						:key="index"
						:item="item"
					/>
				</div>
			</div>
			<h1 v-else class="note centered">No records found!</h1>
		</div>
	</div>
</template>

<script>
import ModalHeader from '@/components/particles/ModalHeader';
import ItemJournal from '@/components/particles/ItemJournal';

export default {
	props: {
		flow: [String, Object]
	},
	components: {
		ModalHeader,
		ItemJournal,
	},

	computed: {
		journal()
		{
			return this.$store.getters['tasks/journal'];
		},
	},
}
</script>