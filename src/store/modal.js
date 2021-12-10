export const state = {
	type: '',
	flow: ''
};

export const getters = {
	opened: state => (state.type),
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