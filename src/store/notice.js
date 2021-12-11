export const state = {
	type: '',
	flow: ''
};

export const getters = {
	opened: state => (state.type) ?? false,
	type: state => state.type,
	flow: state => state.flow
};

export const mutations = {

	show (state, {type, flow}) 
	{
		state.type = (type && typeof type === 'string') ? type : '';
		state.flow = flow ?? '';
	},
	
	hide (state) 
	{
		state.type = '';
		state.flow = '';
	},
};

export const actions = {

	handle ({state, commit, dispatch})
	{
		let { type: action, flow } = state;
		switch (action)
		{
			case 'Teleport':
				this.dispatch('game/teleport', flow);
				break;

			case 'Product':
				this.dispatch('shop/buy', flow.id);
				break;
		}
	}
};