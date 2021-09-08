/*eslint-disable*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import logo from "../../assets/img/recibologo.png";
import MenuIcon from "@material-ui/icons/Menu";

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.js";

const useStyles = makeStyles(styles);

export default function MenuAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: "#9c27b0" }} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={logo} alt="logo" style={{ width: 100, marginTop: -7 }} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ReciboWeb
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
