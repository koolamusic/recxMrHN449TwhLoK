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
					console.log(lat, lng, '/utils/index L22 - FULL OBJ WITH POSITION', { position });
				},
				//error callback
				(error) => (error ? alert(error.message) : reject('Unable to get device location'))
			);
		}
	});
};

export const getLocationFromStorage = () => sessionStorage.getItem('location');

// Text search with location bias
// https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+madina+street&location=5.6364025,-0.1670703&radius=1000&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU

// PLACES DETAIL
// https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating,formatted_phone_number&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU

// EXAMPLE PLACES DETAIL WITH PASSION CLINIC
// https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJEwXhYMyc3w8RCFFRbD4ND0g&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU

// NileHouse Detail
// https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJITmYSE2d3w8Rj1GD80LpLuU&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU

/**
 * PLACES AUTOCOMPLETE RESULT SEARCHING
 * https://maps.googleapis.com/maps/api/place/autocomplete/json?input=nile&types=establishment&location=5.6364025,-0.1670703&strictbounds&radius=50000&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU
 */

// const baseURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=5.6364025,-0.1670703&radius=10000&type=hospital&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU`;

// const baseURL =
// 	'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU&location=5.6364025,-0.1670703&radius=10000&type=hospital';
// export const defaultConfig = {
// 	baseURL: baseURL,
// 	headers: {
// 		'X-Request-With': 'XMLHttpRequest'
// 	}
// };
