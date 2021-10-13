/*eslint-disable*/
import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
import axios from "axios";
import RBCToolbar from "./CustomToolbar.js";

// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ArrowBack from "@material-ui/icons/ArrowBack";

import styles from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";

const localizer = momentLocalizer(moment);

const useStyles = makeStyles(styles);

export default function Calendar(props) {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [itemm1, setitem1] = useState([]);
  const [itemm2, setitem2] = useState([]);
  const [alert, setAlert] = useState(null);
  const [flag, setflag] = useState(false);
  const [HolidayData, setHolidayData] = useState([]);
  const selectedEvent = (event) => {
    window.alert(event.title);
  };
  var items1 = [];
  var items2 = [];
  function combine() {
    items1.push(items2);
    setEvents(items1);
  }
  function hello2() {
    axios
      .get(`/holiday/byclientlocation?id=208`, {
        headers: {
          Authorization: `Bearer ${props.header.token}`,
        },
      })
      .then(function (response) {
        const data2 = response.data.payload;
        if (data2) {
          const transData2 = data2.map((item) => Object.values(item));
          // console.log(data2[1][2], transData2[1][2]);
          if (transData2[0]) {
            for (var i = 0; i < transData2.length; i++) {
              items2.push({
                title: 0,
                start: new Date(transData2[i][2]),
                end: new Date(transData2[i][2]),
                color: "azure",
              });
            }
            setitem2(items2);
          }
        }
      })
      .then(combine());
  }
  function hello() {
    axios
      .get(
        `/timesheet/data?month=${props.BillMonthNumber}&year=${props.billyear}&consultantId=${props.clientId}`,
        {
          headers: {
            Authorization: `Bearer ${props.header.token}`,
          },
        }
      )
      .then(function (response) {
        const data = response.data.payload.list;
        if (data) {
          const transData = data.map((item) => Object.values(item));
          // setClientData(transData);
          if (transData[0]) {
            for (var i = 0; i < transData.length; i++) {
              if (transData[i][5] === "H") {
                items1.push({
                  title: transData[i][4],
                  start: new Date(transData[i][3]),
                  end: new Date(transData[i][3]),
                  color: "azure",
                });
              } else if (transData[i][5] === "L") {
                items1.push({
                  title: transData[i][4],
                  start: new Date(transData[i][3]),
                  end: new Date(transData[i][3]),
                  color: "orange",
                });
              } else {
                if (
                  new Date(transData[i][3]).getDay() == 6 ||
                  new Date(transData[i][3]).getDay() == 0
                ) {
                  items1.push({
                    title: transData[i][4],
                    start: new Date(transData[i][3]),
                    end: new Date(transData[i][3]),
                    color: "red",
                  });
                } else {
                  items1.push({
                    title: transData[i][4],
                    start: new Date(transData[i][3]),
                    end: new Date(transData[i][3]),
                  });
                }
              }
            }
            setitem1(items1);
          }
        }
      })
      .then(hello2());
  }

  useEffect(() => {
    hello();
    // hello2();
  }, []);
  useEffect(() => {
    // console.log();
    setEvents([...itemm1, ...itemm2]);
  }, [itemm1, itemm2]);
  const addNewEventAlert = (slotInfo) => {
    setAlert(
      <SweetAlert
        input
        showCancel
        placeholder={"Enter number of hours worked"}
        openAnim={false}
        style={{ display: "block", marginTop: "-100px" }}
        title="Input something"
        onConfirm={(e) => {
          if (e >= 0 && e % 0.5 === 0) {
            addNewEvent(e, slotInfo);
            setflag(false);
          } else if (e === "L" || e === "l") {
            addLeaveEvent(e, slotInfo);
            setflag(false);
          } else if (e === "H" || e === "h") {
            addHolidayEvent(e, slotInfo);
            setflag(false);
          } else {
            setflag(true);
          }
        }}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
      ></SweetAlert>
    );
  };
  const addNewEvent = (e, slotInfo) => {
    axios({
      method: "post",
      url: "/timesheet/save",
      data: {
        consultantId: props.clientId,
        month: props.BillMonthNumber,
        year: props.billyear,
        isFinalised: "Y",
        list: [
          {
            id: 7,
            date: `${slotInfo.start.getFullYear()}-${
              slotInfo.start.getMonth() + 1
            }-${slotInfo.start.getDate()}`,
            hours: e,
            dayType: "B",
          },
        ],
      },
      headers: {
        Authorization: `Bearer ${props.header.token}`,
      },
    }).then((response) => {
      hello();
    });
    setAlert(null);
  };
  const addLeaveEvent = (e, slotInfo) => {
    axios({
      method: "post",
      url: "/timesheet/save",
      data: {
        consultantId: props.clientId,
        month: props.BillMonthNumber,
        year: props.billyear,
        isFinalised: "Y",
        list: [
          {
            id: 7,
            date: `${slotInfo.start.getFullYear()}-${
              slotInfo.start.getMonth() + 1
            }-${slotInfo.start.getDate()}`,
            hours: 0,
            dayType: "L",
          },
        ],
      },
      headers: {
        Authorization: `Bearer ${props.header.token}`,
      },
    }).then((response) => {
      hello();
    });
    setAlert(null);
  };
  const addHolidayEvent = (e, slotInfo) => {
    axios({
      method: "post",
      url: "/timesheet/save",
      data: {
        consultantId: props.clientId,
        month: props.BillMonthNumber,
        year: props.billyear,
        isFinalised: "Y",
        list: [
          {
            id: 7,
            date: `${slotInfo.start.getFullYear()}-${
              slotInfo.start.getMonth() + 1
            }-${slotInfo.start.getDate()}`,
            hours: 0,
            dayType: "H",
          },
        ],
      },
      headers: {
        Authorization: `Bearer ${props.header.token}`,
      },
    }).then((response) => {
      hello();
    });
    setAlert(null);
  };
  const hideAlert = () => {
    setAlert(null);
  };
  const eventColors = (event) => {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor,
    };
  };
  return (
    <div>
      {alert}
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon style={{ float: "left" }}>
                <Button justIcon color="primary" round onClick={props.click}>
                  <ArrowBack />
                </Button>
              </CardIcon>

              <h3 style={{ color: "#345282", paddingLeft: "100px" }}>
                {props.clientName} Timesheet
              </h3>
            </CardHeader>
            <CardBody>
              {props.BillMonthNumber > new Date().getMonth() - 2 &&
              props.billyear >= new Date().getFullYear() &&
              props.Holidays ? (
                <BigCalendar
                  selectable
                  localizer={localizer}
                  events={events}
                  defaultView="month"
                  defaultDate={
                    new Date(`${props.billyear}-${props.BillMonthNumber}-01`)
                  }
                  onSelectEvent={(event) => selectedEvent(event)}
                  onSelectSlot={(slotInfo) => addNewEventAlert(slotInfo)}
                  eventPropGetter={eventColors}
                  components={{
                    toolbar: RBCToolbar,
                  }}
                />
              ) : (
                <BigCalendar
                  localizer={localizer}
                  events={events}
                  defaultView="month"
                  defaultDate={
                    new Date(`${props.billyear}-${props.BillMonthNumber}-01`)
                  }
                  onSelectEvent={(event) => selectedEvent(event)}
                  onSelectSlot={(slotInfo) => addNewEventAlert(slotInfo)}
                  eventPropGetter={eventColors}
                  components={{
                    toolbar: RBCToolbar,
                  }}
                />
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
