import { NextApiRequest, NextApiResponse } from 'next';

import { Client, Status } from '@googlemaps/google-maps-services-js';
import { resolve } from 'dns';
const client = new Client({});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	return new Promise((resolve, reject) => {
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
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.setHeader('Cache-Control', 'max-age=180000');
					await res.json(r.data.results);
					resolve();
				} else {
					res.json(r.data.error_message);
					resolve();
				}
			})
			.catch((e) => {
				console.log(e);
				reject(e);
			});
	});
};

export default handler;
