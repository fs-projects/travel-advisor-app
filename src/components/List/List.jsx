import React, { useState, useEffect, createRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
} from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const PREFIX = "List";
const classes = {
  container: `${PREFIX}-container`,
  formControl: `${PREFIX}-formControl`,
  inputLabel: `${PREFIX}-inputLabel`,
  selectEmpty: `${PREFIX}-selectEmpty`,
  loading: `${PREFIX}-loading`,
  marginBottom: `${PREFIX}-marginBottom`,
  list: `${PREFIX}-list`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.container}`]: {
    padding: "25px",
  },
  [`& .${classes.formControl}`]: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: "30px",
  },
  [`& .${classes.selectEmpty}`]: {
    marginTop: theme.spacing(2),
  },
  [`& .${classes.loading}`]: {
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  [`& .${classes.marginBottom}`]: {
    marginBottom: "30px",
  },
  [`& .${classes.list}`]: {
    height: "75vh",
    overflow: "auto",
  },
}));
function List({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <Root className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels and Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={rating}
              label="Rating"
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid key={i} item xs={12} ref={elRefs[i]}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Root>
  );
}

export default List;
