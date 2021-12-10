export default [
	{
		id: 'store',
		icon: 'store-alt',
		title: 'Store',
		open: true,
		placing: true
	},
	{
		id: 'monument',
		icon: 'monument',
		title: 'Monument',
		description: 'Ancient Monument of Heroes',
		open: false,
		placing: ['Mugloard']
	},
	{
		id: 'church',
		icon: 'church',
		title: 'Church',
		open: true,
		placing: ['Konoha', 'Mugloard'],
		details: {
			Konoha: {
				title: 'Temple of Mara',
				description: 'Priests and priestess here are dedicated to the worship of the goddess Mara, the goddess of love...'
			},
			Mugloard: {
				title: 'Temple of the Divines',
				description: 'The Temple of the Divines is the main temple of Mugloar. Located in Mugloard, it houses shrines to all of the Eight Divines and one empty pedestal where the shrine of Talos, the Ninth Divine, has been removed...'
			}
		}
	},
	{
		id: 'agency',
		icon: 'home-heart',
		title: 'Agency',
		open: false,
		placing: ['Mugloard']
	},
	{
		id: 'campground',
		icon: 'campground',
		title: 'Camp',
		open: false,
		placing: ['Floran']
	},
	{
		id: 'farm',
		icon: 'farm',
		title: 'Farm',
		description: 'I need to sleep',
		open: false,
		placing: ['Floran', 'Konoha', 'Mugloard']
	},
	{
		id: 'landmark',
		icon: 'landmark-alt',
		title: 'Landmark',
		open: false,
		placing: ['Mugloard']
	},
	{
		id: 'school',
		icon: 'school',
		title: 'School',
		open: false,
		placing: ['Konoha', 'Mugloard']
	}
]