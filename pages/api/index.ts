import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

import { Client, Status } from '@googlemaps/google-maps-services-js';
const client = new Client({});

// Initializing the cors middleware
const cors = Cors({
	methods: [ 'GET', 'HEAD' ]
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
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
					res.setHeader('Content-Type', 'application/json');
					res.setHeader('Cache-Control', 'max-age=180000');
					res.setHeader('Access-Control-Allow-Origin', '*');
					await res.status(200).json(r.data.results);
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
