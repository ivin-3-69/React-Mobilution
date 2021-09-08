/*eslint-disable*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import AdminLayout from "layouts/Admin.js";

import "assets/scss/material-dashboard-pro-react.scss?v=1.10.0";
const Home2 = (props) => {
  const logoutHandler = () => {
    props.logout();
  };

  // console.log(props.response);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            path="/admin"
            component={() => <AdminLayout title={props.response} />}
          />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Home2;
