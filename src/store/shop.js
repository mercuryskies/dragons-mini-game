import Factory from '@/factories';
const Client = Factory.init({
	models: ['Game', 'Reputation'],
	endpoints: {
		explore: ['get', ':gameId/shop'],
		purchase: ['post', ':gameId/shop/buy/:itemId']
	}
});

export const state = {
	items: '',
};

export const getters = {
	items: state => state.items ?? [],
};

export const mutations = {

	SET_ITEMS (state, data)
	{
		state.items = data;
	},
};

export const actions = {

	async init ({ commit, dispatch }, id)
	{
		const gameId = id ?? this.getters['game/id'];
		if (!gameId) return;
		const { data } = await Client.explore({ gameId });//TODO! model validation
		commit('SET_ITEMS', data);
	},

	async buy ({ commit, dispatch }, itemId)
	{
		const gameId = this.getters['game/id'];
		if (!gameId || !itemId) return;
		const { data } = await Client.purchase({ gameId, itemId });//TODO! model validation
		const { shoppingSuccess, ...stats } = data;
		if (!data) return;
		this.commit('notice/show', {
			type: 'Purchase',
			flow: data
		});
		this.commit('game/SET_STATS', stats);
		if (shoppingSuccess) this.commit('game/SET_INVENTORY', itemId);
	},
};