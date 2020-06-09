/// <reference types="@types/googlemaps" />

// declare global type definitions
// declare global {
//     interface Window {
//             google: google.maps
//     }
// }

export const accra = { lat: 5.6364025, lng: -0.1670703 };
export const service = window && window.google.maps.places;
console.log(service);
