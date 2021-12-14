import { config, shallowMount, createLocalVue, RouterLinkStub, flushPromises } from '@vue/test-utils';
import store from '@/store';

import Login from '@/components/Login.vue';

const localVue = createLocalVue();
localVue.use(store);


describe('Login.vue', () => {
	
	const username = 'TestUsername';

	const factory = () => shallowMount(Login, {
		localVue,
		store,
		stubs: {
			RouterLink: RouterLinkStub
		},
		mocks: {
			$get: (type) => store.getters[type],
			$act: (type, data) => store.dispatch(type, data)
		},
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const spyStart = jest.spyOn(Login.methods, 'start');

	it('it checks if store is not dispatched if username is not defined', async () => {
		const wrapper = factory();
		const input = wrapper.find('input[type="text"]');
		const button = wrapper.find('button[type="submit"]');

		expect(input.exists()).toBeTruthy();
		expect(button.exists()).toBeTruthy();
		await button.trigger('click');
		expect(spyStart).toBeCalled();
	})

	it('it checks if username is provided, store is dispatched and game started', async () => {
		const wrapper = factory();
		const button = wrapper.find('button[type="submit"]');
		const input = wrapper.find('input[type="text"]');
		await input.setValue(username);
		await button.trigger('click');

		expect(spyStart).toBeCalled();
		let res = await Promise.resolve(spyStart.mock.results[0].value);
		expect(res).toBeInstanceOf(Object);
		expect(res).toHaveProperty('gameId');
	})
})
