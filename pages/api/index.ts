import { NextApiRequest, NextApiResponse } from 'next';

import { Client, Status } from '@googlemaps/google-maps-services-js';
const client = new Client({});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	client
		.placesNearby({
			params: {
				location: { lat: 5.6364025, lng: -0.1670703 },
				radius: 10000,
				type: 'hospital',
				key: 'AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU'
			},
			timeout: 1000 // milliseconds
		})
		.then(async (r) => {
			if (r.data.status === Status.OK) {
				await res.json(r.data.results);
				res.statusCode = 200;
			} else {
				res.json(r.data.error_message);
			}
		})
		.catch((e) => {
			console.log(e);
		});
};

export default handler;
