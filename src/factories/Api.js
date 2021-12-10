import axios from 'axios';

//const baseDomain = process.env.NODE_ENV === 'development' ? process.env.VUE_BASE_DOMAIN : 'https://dragonsofmugloar.com';
const baseDomain = 'https://dragonsofmugloar.com';
export const urlPostfix = '/api/v2';
export const baseURL = `${baseDomain}${urlPostfix}`;

const instance = axios.create({
	baseURL,
	transformResponse: (responseString) => {
		try 
		{
			/*
			Error 400: 
			{
			    "error": "No ad by this ID exists"
			}
			*/



			const response = JSON.parse(responseString);
			return response;
		}
		catch (e)
		{
			//console.log(e);
			return e;
		}
	},
});

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
	console.log(fullPath);
	console.log('requesting');
	return instance[method](fullPath);
};