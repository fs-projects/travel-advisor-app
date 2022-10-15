import React from "react";

import { Autocomplete } from "@react-google-maps/api";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/ToolBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";

const PREFIX = "Header";
const classes = {
  title: `${PREFIX}-title`,
  search: `${PREFIX}-search`,
  searchIcon: `${PREFIX}-searchIcon`,
  inputRoot: `${PREFIX}-inputRoot`,
  inputInput: `${PREFIX}-inputInput`,
  toolbar: `${PREFIX}-toolbar`,
};
const Root = styled("div")(({ theme }) => ({
  [`& .${classes.title}`]: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  [`& .${classes.search}`]: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  [`& .${classes.searchIcon}`]: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  [`& .${classes.inputRoot}`]: {
    color: "inherit",
  },
  [`& .${classes.inputInput}`]: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
  [`& .${classes.toolbar}`]: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function Header({ onLoad, onPlaceChanged }) {
  return (
    <Root>
      <AppBar position="static">
        <ToolBar className={classes.toolbar}>
          <Typography variant="h5" className={classes.title}>
            Travel Advisor
          </Typography>
          <Box display="flex">
            <Typography variant="h6" className={classes.title}>
              Explore new places
            </Typography>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Autocomplete>
          </Box>
        </ToolBar>
      </AppBar>
    </Root>
  );
}

export default Header;
