import tmpl from 'string-template';
import axios, { AxiosRequestConfig, Method } from 'axios';

interface IPosition {
	coords: {
		latitude: number;
		longitude: number;
	};
}

export const getCurrentLocation = () => {
	return new Promise<string | any>((resolve, reject) => {
		if (!navigator.geolocation) {
			reject('Geolocation not supported by the browser');
		} else {
			navigator.geolocation.getCurrentPosition(
				//success callback
				(position: IPosition) => {
					const { latitude: lat, longitude: lng } = position.coords;
					if (typeof lat === void 0 || typeof lng === void 0) {
						reject('Browser returned invalid location');
					}
					resolve({ lat, lng });
					sessionStorage.setItem('location', JSON.stringify({ lat, lng }));
					console.log(lat, lng, 'FULL OBJ WITH POSITION', { position });
				},
				//error callback
				(error) => (error ? alert(error.message) : reject('Unable to get device location'))
			);
		}
	});
};

export const getLocationFromStorage = () => sessionStorage.getItem('location');

const defaultHeaders = {
	'X-Request-With': 'XMLHttpRequest'
};
const buildURL = (endpoint: string, pattern: string = '', data: Object = {}) => {
	// build the url out of the pattern and the data structure sent
	let stub = tmpl(pattern, data).replace(/\/+$/, '');
	return [ endpoint, stub ].join('/').replace(/\/+$/, '');
};

export const executeRequest = (
	endpoint: string,
	data: any = {},
	pattern: string = '',
	method: Method = 'GET',
	ctx: AxiosRequestConfig = {}
) => {
	// build and execute a request based on url pattern and method sent
	let url = buildURL(endpoint, pattern, data);
	let config: any = { method, url };
	let key = method.toLowerCase() === 'get' ? 'params' : 'data';
	config[key] = data;

	// return Auth.getAuthHeaders(ctx).then((headers) => {
	const updatedHeaders = Object.assign({}, defaultHeaders, config.headers);
	console.log({ updatedHeaders, defaultHeaders, config });

	// Add Headers to Config Object
	config['headers'] = updatedHeaders;
	return axios.request(config);
};

// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=YOUR_API_KEY

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU

// Text search with location bias
// https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+madina+street&location=5.6364025,-0.1670703&radius=1000&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU

// PLACES DETAIL
// https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating,formatted_phone_number&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU

// EXAMPLE PLACES DETAIL WITH PASSION CLINIC
// https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJEwXhYMyc3w8RCFFRbD4ND0g&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU
