import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, Rating, useMediaQuery } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { styled } from "@mui/material/styles";
import { mapStyles } from "../../mapStyles";

const PREFIX = "Map";
const classes = {
  mapContainer: `${PREFIX}-mapContainer`,
  paper: `${PREFIX}-paper`,
  markerContainer: `${PREFIX}-markerContainer`,
  pointer: `${PREFIX}-pointer`,
};
const Root = styled("div")(({ theme }) => ({
  [`&.${classes.mapContainer}`]: {
    height: "85vh",
    width: "100%",
  },
  [`& .${classes.paper}`]: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100px",
  },
  [`& .${classes.markerContainer}`]: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    "&:hover": { zIndex: 2 },
  },
  [`& .${classes.pointer}`]: {
    cursor: "pointer",
  },
}));
const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) => {
  const isMobile = useMediaQuery("(min-width:600px)");

  return (
    <Root className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
        }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          if (e?.center?.lat && e?.center?.lng) {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.length &&
          places.map((place, i) => (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {!isMobile ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {" "}
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    alt={places.name}
                  />
                  <Rating
                    name="read-only"
                    size="small"
                    value={Number(place.rating)}
                    readOnly
                  />
                </Paper>
              )}
            </div>
          ))}
        {weatherData?.coord && weatherData?.weather?.length && (
          <div lat={weatherData.coord.lat} lng={weatherData.coord.lon}>
            <img
              src={`http://openweathermap.org/img/w/${weatherData?.weather?.[0]?.icon}.png`}
              height="70px"
              alt={"weather"}
            />
          </div>
        )}
      </GoogleMapReact>
    </Root>
  );
};

export default Map;
