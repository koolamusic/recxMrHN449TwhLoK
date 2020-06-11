import { LatLngArray } from './../../utils/common';
import { PlacesNearbyRequest } from './lib/placesnearby';
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

// interface IQuery extends NextApiRequest {
// 	lat?: any;
// 	lng?: any;
// 	radius?: any;
// 	[key: string]: any;
// }
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);

	const { query, body }: any = await req;
	// const data = JSON.parse(query);
	// const { query: { lat, lng, radius } }: any = req;
	// const LatLngArray: LatLngArray = await [ parseFloat(lat), parseFloat(lng) ];
	// const bias: number = await parseFloat(radius);
	console.log(
		// req.query,
		// query,
		req.body,
		'=============QUERY OBJ============================================================>>>>>>>>>>>>>>>>>>>>>>>>'
	);
	// res.json({ Me: 'Fore' });

	return new Promise((resolve, reject) => {
		client
			.placesNearby({
				params: {
					// location: LatLngArray,
					// radius: bias,
					// location: { lat, lng },
					// radius: radius,
					type: 'hospital',
					key: 'AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU',
					...body
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
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};

export default handler;
