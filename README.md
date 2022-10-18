This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can see live version here : [Travel Advisor](https://634e519bef47231d1e5c3303--starlit-crisp-7954ae.netlify.app)

- Note that when you are watching the live version the map might not be loading or the places on the left are not showing. This could be because the api keys are running under free version so I would highly recommend you run the project in your local as mentioned in step below to see all the functionalities together.

## First things First (Follow below steps after you clone the project in your local) : 
- Create an .env file at the **root level** of this project in your local.
- Make sure to generate your GoogleMaps Api keys and enable this api from [console.cloud.google.com](console.cloud.google.com) and paste it in your .env file.
- Signup in RapidApi website and subscribe to [https://rapidapi.com/apidojo/api/travel-advisor/](https://rapidapi.com/apidojo/api/travel-advisor/) to see the api key and paste it in your .env file
- Signup in [https://openweathermap.org/api](https://openweathermap.org/api) and then get your api key from username -> my api key in the top right corner and paste it in your env file
- Once you get all the 3 keys from above steps add it in your .env file like this (without angular brackets of course!)

REACT_APP_RAPID_API_KEY=`<your rapid api key>`

REACT_APP_OPEN_WEATHER_MAP_API_KEY=`<your open weather map api key>`

REACT_APP_GOOGLE_MAPS_API_KEY=`<your google maps api key>`


In the project directory, you can run:

### `npm install` and `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### See "Issues" tab of this repo. Please see if you can help me fix those. Thank you in advance!
