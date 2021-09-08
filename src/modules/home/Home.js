/*eslint-disable*/
import Sidebar from "components/Sidebar/Sidebar";
import React from "react";
import AdminNavbar from "../../components/Navbars/AdminNavbar";

const Home = () => {
  return (
    <>
      <AdminNavbar brandText="Recibo Web" color="primary"></AdminNavbar>
      <div style={{ padding: "85px 20px" }}>
        <h3>Home page</h3>
      </div>
    </>
  );
};

export default Home;
