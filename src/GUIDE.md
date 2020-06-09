# Overview

In this COVID world that we live in, it is important that people can easily access medical assistance if need be. With that in mind, the goal of this challenge is to build an application that can locate all the hospitals within a given area.

**Please read through this document carefully.**

## Technologies

These following technologies must be used when building this application

- [ReactJS](https://reactjs.org/docs/getting-started.html) and [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Typescript](https://create-react-app.dev/docs/adding-typescript/)
- [Google Maps API](https://developers.google.com/maps/documentation) or [Google Places API](https://developers.google.com/places/web-service/intro) or Any Third Party Location API of Choice
- Choose one of the following Component Libraries
    - [AntD](https://ant.design/docs/react/introduce)
    - [Material Design](https://material-ui.com/)

*You are allowed to use any additional piece of technology that you believe will help you complete this challenge. Just make sure that you are using the ones listed above.*

### Application Requirements

- Users should be able to type into a search bar
- Users should be able to pick a geo-fencing radius for the search results
    - (example - 5km, 10km, 20km etc...)
- Typing into the search bar generates search results
- User should be able to see the search results
    - Up to you to decide how to render the results
- The code must be completely written in **[Typescript](https://www.typescriptlang.org/)**
- The application must be **deployed**
    - (i.e - Firebase, Heroku, AWS, GCP, DigitalOcean, etc...)

### Judgement Criteria

- The application must meet all criterias described in the above requirements and use the technologies specified
- We are looking for well-designed user interfaces meaning your application should be visually pleasing.
    - (Hint - Use the component libraries)
- The application should be **bug free**

### Submission

You will have **4 days**, from the day you applied to submit this challenge

- [Submission Link](https://airtable.com/shriG6w2FwkuI0Wc0)

### Attention

- There are no extensions to the submission deadline. Failure to submit your application within that given timeframe will disqualify you from moving forward.
- If you are unable to leverage the Google Map API for verification reason, you are allowed to leverage any third location API

```js

  // fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=5.6364025,-0.1670703&radius=10000&type=hospital&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU`, {
  //   mode: 'no-cors',
  //   credentials: 'include', // send cookies
  //   headers: {
  //     // 'Accept': 'application/json',
  //     'Accept': 'application/x-www-form-urlencoded',
  //     "Access-Control-Allow-Origin": "*",
  //   }
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data)
  //   })
  //   .catch(err => console.error(err))

    // console.log(placesNearby({ params: { location: { lat: 5.6364025, lng: -0.1670703 }, radius: 10000, type: 'hospital' } }))

  request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=5.6364025,-0.1670703&radius=10000&type=hospital&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU', function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });

```
