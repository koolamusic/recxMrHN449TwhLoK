import React, { Component, Fragment } from "react";
import { Map, GoogleApiWrapper, Marker, IProvidedProps, IMapProps } from "google-maps-react";

interface IMapWrapper extends IMapProps {
    google: IProvidedProps,
    stateUpdate: Function | any
}

class MapWrapper extends Component<IMapProps | IMapWrapper> {
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const locationDetected = true;
                sessionStorage.setItem('loc', JSON.stringify({ latitude, longitude, locationDetected }));
            },
            error => alert(error.message)
        );
    };


    fetchPlaces(mapProps: IMapProps, map: { getCenter: () => any; }) {
        const { google } = mapProps;
        const service = new google.maps.places.PlacesService(map);
        const request = {
            location: map.getCenter()
        };

        service.nearbySearch(request, (results: any, status: any) => {
            //@ts-ignore
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                sessionStorage.setItem('places', JSON.stringify(results))
            }
        });
    };

    render() {

        return (
            <Map
                google={this.props.google}
                zoom={14}
                // initialCenter={{ lat: latitude, lng: longitude }}
                onReady={(mapProps: any, map) => this.fetchPlaces(mapProps, map)}>
            </Map>
        );
    };
};




export default GoogleApiWrapper({
    apiKey: "AIzaSyCfzWY9B6LyhQJ-bVi2BWitjePhWPeWkpY",
})(MapWrapper);
