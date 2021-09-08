/*eslint-disable*/
import moment from "moment";
import React, { useState } from "react";

function RBCToolbar(props) {
  const month = () => {
    const date = moment(props.date);
    let month = date.format("MMMM");
    let day = date.format("D");

    return (
      <span className="rbc-toolbar-label rbc-date">
        <i className="far fa-calendar"></i> <span>{`${month}`}</span>
      </span>
    );
  };

  return (
    <div className="rbc-toolbar">
      <div className="rbc-toolbar-item-2">{month()}</div>
    </div>
  );
}

export default RBCToolbar;
