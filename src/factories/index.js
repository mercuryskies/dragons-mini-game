import { request } from './Api';
import { modules } from './Repository';
import { logic, validate } from './GameLogic';

export default {

	init: ({ models, endpoints }) => {

		const reservedNamespaces = ['modules'];
		const routes = {};

		if (models)
		{
			//console.log(models);
			//console.log(modules);
			//console.log(hey);
		}

		//build store endpoints
		if (endpoints && typeof endpoints === 'object')
		{
			Object.keys(endpoints).forEach((i) => {
				if (reservedNamespaces.includes(i)) return;
				let [ method, url ] = endpoints[i];
				let call = {
					[i](payload) {
						return request(method, url, payload);
					}
				};
				Object.assign(routes, call);
			});
		}
		return { ...routes };
		//return { models, modules, endpoints };
	},

	sync: (gameState) => {

		return 'todo';
	}
}
