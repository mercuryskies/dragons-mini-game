import axios from 'axios';
import store from '@/store';

//const baseDomain = process.env.NODE_ENV === 'development' ? process.env.VUE_BASE_DOMAIN : 'https://dragonsofmugloar.com';
const baseDomain = 'https://dragonsofmugloar.com';
export const urlPostfix = '/api/v2';
export const baseURL = `${baseDomain}${urlPostfix}`;

const instance = axios.create({
	baseURL,
	transformResponse: (data) => {
		let response;
		try 
		{
			response = JSON.parse(data);
		} 
		catch (e) 
		{
			return e;
			//throw Error('JSON parse error');
		}
		return response;
	},
});

instance.interceptors.response.use((response) => response,
	async function(error) 
	{
		const originalRequest = error.config;

		if (error?.response?.status === 400)
		{
			store.commit('notice/show', {
				type: 'Error',
				flow: {
					description: 'Someone already took this task!',
					icon: 'otter'
				}
			});
			store.dispatch('tasks/init');
			await store.dispatch('tasks/init');
			return Promise.reject(error);
		}
		return Promise.reject(error);
	}
);

export const request = (method, url, payload) => {
	let urlParts = url.split('/');
	let namedParts = urlParts
		.map((e,i) => e.startsWith(':') ? i : undefined)
		.filter(x => x !== undefined);
	if (namedParts.length)
	{
		urlParts = urlParts.map((part, i) => {
			return (namedParts.includes(i) && payload[part.substr(1)]) 
				? payload[part.substr(1)] 
				: part;
		});
	}
	let fullPath = urlParts.join('/');
	//console.log(fullPath);
	//console.log('requesting');
	return instance[method](fullPath);
};