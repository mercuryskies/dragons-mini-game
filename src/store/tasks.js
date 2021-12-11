import Factory from '@/factories';
const Client = Factory.init({
	models: ['Task'],
	endpoints: {
		explore: ['get', ':gameId/messages'],
		solve: ['post', ':gameId/solve/:adId']
	}
});

import VILLAGES from '@/factories/data/villages';

export const state = {
	items: '',
	journal: []
};

export const getters = {

	byVillage: state => state.items,

	journal: state => state.journal,

	items: (state, getters, _State, _Getters) => {
		let location = _Getters['game/location'] ?? null;
		let { items } = state;
		if (!location || !items || !Array.isArray(items)) return [];
		return items.filter(i => i.name === location)[0].items ?? [];
	},
};

export const mutations = {

	SET_ITEMS (state, data)
	{
		state.items = (data && Array.isArray(data) ? data : []).reduce((acc, v) => {
			Object.keys(VILLAGES).map((o, i) => {
				if (!acc[i]) acc.push({ name: o, items: [], ...VILLAGES[o] });
				if (v.reward >= VILLAGES[o].min && v.reward <= VILLAGES[o].max) acc[i].items.push(v);
			});
			return acc;
		},[]);
	},

	SET_JOURNAL (state, data)
	{
		state.journal.unshift(data);
	}
};

export const actions = {

	async init ({ commit, dispatch }, id)
	{
		const gameId = id ?? this.getters['game/id'];
		if (!gameId) return;
		const { data } = await Client.explore({ gameId });//TODO! model validation
		commit('SET_ITEMS', data);
	},

	async solve ({ commit, dispatch }, { adId, message: msg })
	{
		const gameId = this.getters['game/id'];
		if (!gameId || !adId) return;
		const { data } = await Client.solve({ gameId, adId });//TODO! model validation
		const { message, ...stats } = data;
		if (!message) return;
		dispatch('init', gameId);//update tasks
		commit('SET_JOURNAL', {...data, adId, msg});
		this.dispatch('game/investigate');
		this.commit('game/SET_STATS', stats);
		this.commit('notice/show', {
			type: 'Task',
			flow: data
		});
	}
};


const seed = [
	{
		"adId": "Ckb1uftg",
		"message": "Help Emmet Radclyffe to transport a magic house to grassland in Bloodshore",
		"reward": 14,
		"expiresIn": 6,
		"probability": "Walk in the park"
	},
	{
		"adId": "FgePRX2c",
		"message": "Help Fíona Humphrey to reach an agreement with Serpi̇l Stephenson on the matters of disputed house",
		"reward": 10,
		"expiresIn": 6,
		"probability": "Walk in the park"
	},
	{
		"adId": "4R9roTqg",
		"message": "Steal cat delivery to Hreiðarr Sempers and share some of the profits with the people.",
		"reward": 64,
		"expiresIn": 6,
		"probability": "Sure thing"
	},
	{
		"adId": "WTLCidiE",
		"message": "Create an advertisement campaign for Roxy Þórhalldóttir to promote their dog based business",
		"reward": 37,
		"expiresIn": 6,
		"probability": "Piece of cake"
	},
	{
		"adId": "tAiGr6JN",
		"message": "Help Coleen Appleby to clean their potatoes",
		"reward": 1,
		"expiresIn": 6,
		"probability": "Sure thing"
	},
	{
		"adId": "R35UKfAI",
		"message": "Help Luĉjo Hamilton to write their biographical novel about their difficulties with a deranged cat",
		"reward": 45,
		"expiresIn": 6,
		"probability": "Walk in the park"
	},
	{
		"adId": "1c0lKeN4",
		"message": "Create an advertisement campaign for Gréta Chamberlain to promote their dog based business",
		"reward": 25,
		"expiresIn": 6,
		"probability": "Hmmm...."
	},
	{
		"adId": "i0HNBi5Y",
		"message": "Escort Elah Madison to grassland in Eastwater where they can meet with their long lost chicken",
		"reward": 78,
		"expiresIn": 6,
		"probability": "Risky"
	},
	{
		"adId": "1JGPmsrh",
		"message": "Create an advertisement campaign for Seaghdh Robinson to promote their turnips based business",
		"reward": 23,
		"expiresIn": 6,
		"probability": "Gamble"
	},
	{
		"adId": "mgLZhucz",
		"message": "Help Lára Christinsen to transport a magic potatoes to thrift shoppe in Masonton",
		"reward": 20,
		"expiresIn": 6,
		"probability": "Walk in the park"
	}
]