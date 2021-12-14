import Factory from '@/factories';
const Client = Factory.init({
	models: ['Game', 'Reputation'],
	endpoints: {
		start: ['post', 'game/start'],
		investigate: ['post', ':gameId/investigate/reputation']
	}
});

import VILLAGES from '@/factories/data/villages';
import PLACES from '@/factories/data/places';
import SPAWNS from '@/factories/data/spawns';
import PRODUCTS from '@/factories/data/products';

const BASE_STATS = ['lives', 'gold', 'score', 'highScore', 'turn'];
const BASE_ITEMS = [
	{
		"id": "map",
		"name": "World Map",
		"cost": 0
	},
	{
	"id": "teleport",
	"name": "Teleporting Device",
	"cost": 0
	}
];

export const state = {
	stage: '',
	game: '',
	reputation: '',
	inventory: [],
	username: '',
	location: '',
	place: '',
	teleporting: false
};

export const getters = {
	id: state => state.game?.gameId,
	stage: state => state.stage,
	started: state => !!state.game?.gameId,
	alive: state => !!(state.game.lives > 0),
	data: state => {
		let { username, location, reputation } = state;
		return Object.assign({...state.game}, {
			username, 
			location,
			reputation,
		});
	},
	username: state => state.username,

	//inventory
	inventory: state => {
		let { gold } = state.game;
		let items = state.inventory;
		return { items, gold };
	},

	//location
	location: state => state.location,
	locationInfo: state => {
		const { icon } = VILLAGES[state.location];
		return { title: state.location, icon };
	},
	teleporting: state => state.teleporting,
	place: state => state.place,

	//world
	places: (state, getters) => {
		let { title, icon } = getters.locationInfo;
		const places = PLACES.reduce((acc, v) => {
			let placing = v.placing ?? false;
			if (placing 
				&& (placing === true 
					|| Array.isArray(placing) && placing.includes(state.location))
			) acc.push(v);
			return acc;
		}, []);
		const base = {
			id: 'hall',
			title: title+' Hall',
			icon,
			open: true
		};
		//places.unshift(base);
		places.splice(Math.trunc(places.length / 2), 0, base);
		return places;
	},
	spawns: (state) => {
		let { location } = state;
		return Object.keys(SPAWNS).reduce((acc, v) => {
			let placing = SPAWNS[v].placing;
			if (Object.keys(placing).includes(location) && !acc[v]) 
			{
				let count = placing[location];
				acc.push({[v]: Math.floor(Math.random() * count) + 1});
			}
			return acc;
		}, []);
	},

	//items
	getItems: (state, getters, _State, _Getters) => (source) => {
		switch (source)
		{
			case 'hall':
				source = 'tasks/items';
				break;

			case 'store':
				source = 'shop/items';
				break;
		}
		return _Getters[source] ?? [];
	},
};

export const mutations = {

	START_GAME (state, data)
	{
		const { username, ...game } = data;
		state.game = game;
		state.username = username;
		state.location = 'Camp';
		state.stage = 0;
	},

	INIT_GAME (state)
	{
		state.inventory = BASE_ITEMS;
		state.stage = 1;
	},

	SET_STAGE (state, data)
	{
		state.stage = data;
	},

	SET_REPUTATION (state, data)
	{
		state.reputation = data;
	},

	SET_INVENTORY (state, itemId)
	{
		if (itemId === 'hpot') return;
		let item = PRODUCTS.filter(i => i.id === itemId)[0];
		if (item) state.inventory.unshift(item);
	},

	SET_STATS (state, data)
	{
		if (!state.game || !data || typeof data != 'object') return;
		Object.keys(data).reduce((acc, v) => {
			if (BASE_STATS.includes(v)) state.game[v] = data[v];
			return acc;
		},[]);
	},

	MOVE (state, direction)
	{
		state.teleporting = true;
		state.location = direction;
		let timer = setTimeout(() => {
			state.teleporting = false;
		}, 1000);
	},

	END_GAME (state)
	{
		state.stage = '';
		state.game = '';
		state.reputation = '';
		state.inventory = [];
		//state.username = '';
		state.location = '';
		state.place = '';
		state.teleporting = false;
	},

	//places
	enterPlace (state, place)
	{
		state.place = place;
	},

	leavePlace (state)
	{
		state.place = '';
	}
};

export const actions = {

	async start ({ commit, dispatch }, { username })
	{
		const { data } = await Client.start();
		const { gameId, ...game } = data ?? {};
		if (!gameId) return;//TODO! model validation
		//start
		commit('START_GAME', { ...game, gameId, username });
		return data;
	},

	init ({ state, commit, dispatch })
	{
		const { gameId } = state.game;
		if (!gameId) return;
		commit('INIT_GAME');
		//init data
		this.dispatch('tasks/init', gameId);
		this.dispatch('shop/init', gameId);
		dispatch('investigate');
	},

	async investigate ({ state, commit })
	{
		const { gameId } = state.game;
		if (!gameId) return;
		const { data } = await Client.investigate({ gameId });
		//TODO! model validation
		commit('SET_REPUTATION', data);
	},

	teleport ({ state, commit, dispatch }, direction)
	{
		let { location } = state;
		if (!this.getters['notice/opened'])
		{
			//init
			this.commit('notice/show', {
				type: 'Teleport',
				flow: direction
			});
		}
		else
		{
			//confirm
			commit('MOVE', direction);
			dispatch('hideModals');
		}
		commit('leavePlace');
	},

	hideModals ({ commit, dispatch })
	{
		this.commit('modal/hide');
		this.commit('notice/hide');
	},

	end ({ commit, dispatch })
	{
		dispatch('hideModals');
		commit('END_GAME');
	}
};


const TEST = {
	game: {
		"gameId": "bHl1WZPw",
		"lives": 5,
		"gold": 0,
		"level": 0,
		"score": 0,
		"highScore": 0,
		"turn": 0
	},

	reputation: {
		"people": 0,
		"state": 0,
		"underworld": 0
	},

	inventory: [
		{
			"id": "map",
			"name": "World Map",
			"cost": 0
		},
		{
			"id": "teleport",
			"name": "Teleporting Device",
			"cost": 0
		},
		{
			"id": "hpot",
			"name": "Healing potion",
			"cost": 50
		},
		{
			"id": "cs",
			"name": "Claw Sharpening",
			"cost": 100
		}
	]
};