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
				() => reject('Unable to get device location')
			);
		}
	});
};

export const getLocationFromStorage = () => sessionStorage.getItem('location');
