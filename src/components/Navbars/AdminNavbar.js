/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

// material-ui icons
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";

// core components
import AdminNavbarLinks from "./AdminNavbarLinks";
import Button from "components/CustomButtons/Button.js";
import logo from "../../assets/img/recibologo.png";

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbar(props) {
  const classes = useStyles();
  const { color, rtlActive, brandText } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color,
  });
  const sidebarMinimize =
    classes.sidebarMinimize +
    " " +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive,
    });

  const logoutHandler = () => {
    props.logout();
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Hidden smDown implementation="css">
            <div className={sidebarMinimize}>
              {props.miniActive ? (
                <Button justIcon round onClick={props.sidebarMinimize}>
                  <ViewList className={classes.sidebarMiniIcon} />
                </Button>
              ) : (
                <Button justIcon round onClick={props.sidebarMinimize}>
                  <MoreVert className={classes.sidebarMiniIcon} />
                </Button>
              )}
            </div>
          </Hidden>
          <div className={classes.flex}>
            <Button
              href="/admin/dashboard"
              className={classes.title}
              color="transparent"
            >
              {brandText}
            </Button>
          </div>
          <Hidden smDown implementation="css">
            <AdminNavbarLinks rtlActive={rtlActive} />
          </Hidden>
          <Hidden mdUp implementation="css">
            <Button
              className={classes.appResponsive}
              justIcon
              aria-label="open drawer"
              onClick={props.handleDrawerToggle}
            >
              <Menu />
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
