import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { getPlacesData, getWeatherData } from "./api/index";

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        if (latitude && longitude) {
          setCoordinates({ lat: latitude, lng: longitude });
        }
      }
    );
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
      setWeatherData(data)
    );
    if (bounds?.sw && bounds?.ne) {
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(
            data?.filter((place) => place.name && place.num_reviews > 0)
          );
          setIsLoading(false);
          setFilteredPlaces([]);
          setRating(0);
        })
        .catch((error) => {
          // console.log("Error occurred in places api", error);
        });
    }
  }, [type, bounds]);

  useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    if (lat && lng) {
      setCoordinates({ lat, lng });
    }
  };

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
