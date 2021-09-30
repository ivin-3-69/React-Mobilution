/*eslint-disable*/
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "store/auth-context";
// import axios from "axios";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import ChartistGraph from "react-chartist";
import moment from "moment";
import axios from "axios";
import RBCToolbar from "./CustomToolbar.js";
import Timeline from "@material-ui/icons/Timeline";

import { faHome, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ArrowBack from "@material-ui/icons/ArrowBack";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";

const localizer = momentLocalizer(moment);

const useStyles = makeStyles(styles);

export default function Calendar(props) {
  const ctx = useContext(AuthContext);
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [itemm1, setitem1] = useState([]);
  const [itemm2, setitem2] = useState([]);
  const [alert, setAlert] = useState(null);
  const [flag, setflag] = useState(false);
  const [hours, setHours] = useState([]);
  const selectedEvent = (event) => {
    window.alert(event.title);
  };
  var items1 = [];
  var items2 = [];

  function hello2() {
    axios
      .get(`/holiday/byclientlocation?id=${props.location}`, {
        headers: {
          Authorization: `Bearer ${props.header.token}`,
        },
      })
      .then(function (response) {
        if (response.status === 401) {
          ctx.logout();
        } else {
          const data2 = response.data.payload;
          if (data2) {
            const transData2 = data2.map((item) => Object.values(item));
            // console.log(data2[1][2], transData2[1][2]);
            if (transData2[0]) {
              for (var i = 0; i < transData2.length; i++) {
                items2.push({
                  id: 7,
                  date: transData2[i][2],
                  hours: 0,
                  dayType: "H",
                });
              }
              setitem2(items2);
            }
          }
        }
      })
      .then((response) => {
        axios({
          method: "post",
          url: "/timesheet/save",
          data: {
            consultantId: props.clientId,
            month: props.BillMonthNumber,
            year: props.billyear,
            isFinalised: "Y",
            list: items2,
          },
          headers: {
            Authorization: `Bearer ${props.header.token}`,
          },
        }).then((response) => {
          if (response.status === 401) {
            ctx.logout();
          } else {
            hello();
          }
        });
      });
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
        if (response.status === 401) {
          ctx.logout();
        } else {
          setHours(response.data.payload.totalWorkingHours);
          const data = response.data.payload.list;
          if (data) {
            const transData = data.map((item) => Object.values(item));
            if (transData[0]) {
              for (var i = 0; i < transData.length; i++) {
                if (transData[i][5] === "H" && transData[i][4] === 0) {
                  items1.push({
                    title: "H",
                    start: new Date(transData[i][3]),
                    end: new Date(transData[i][3]),
                    color: "azure",
                  });
                } else if (transData[i][5] === "H" && transData[i][4] > 0) {
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
        }
      });
  }

  useEffect(() => {
    hello2();
  }, []);
  useEffect(() => {
    setEvents(itemm1);
  }, [itemm1, itemm2]);
  const addNewEventAlert = (slotInfo, safe) => {
    setAlert(
      <SweetAlert
        input
        showCancel
        placeholder={"Enter number of hours worked"}
        openAnim={false}
        style={{ display: "block", marginTop: "-100px" }}
        title={`${slotInfo.start.getDate()}-${
          slotInfo.start.getMonth() + 1
        }-${slotInfo.start.getFullYear()}`}
        onConfirm={(e) => {
          if (safe == true) {
            if (e > 0 && e % 0.5 === 0 && e <= 24) {
              addNewEvent(e, slotInfo);
              setflag(false);
            } else if (e === "L" || e === "l") {
              addLeaveEvent(e, slotInfo);
              setflag(false);
            } else {
              setflag(true);
            }
          } else {
            if (e > 0 && e % 0.5 === 0 && e <= 24) {
              addNewEvent(e, slotInfo, true);
              setflag(false);
            } else if (e === "L" || e === "l") {
              addNewEvent(0, slotInfo, true);
              setAlert(null);
            }
          }
        }}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
      ></SweetAlert>
    );
  };
  const addNewEvent = (e, slotInfo, isHoliday) => {
    var daaytype;
    if (isHoliday) {
      daaytype = "H";
      // console.log("caution");
    } else {
      daaytype = "B";
    }
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
            dayType: daaytype,
          },
        ],
      },
      headers: {
        Authorization: `Bearer ${props.header.token}`,
      },
    }).then((response) => {
      if (response.status === 401) {
        ctx.logout();
      } else {
        hello();
      }
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
      if (response.status === 401) {
        ctx.logout();
      } else {
        hello();
      }
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
      if (response.status === 401) {
        ctx.logout();
      } else {
        hello();
      }
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
    var style = {
      borderRadius: "0px",
      color: "black",
      border: "0px",
      display: "block",
      fontSize: "20px",
      paddingTop: "15px",
      paddingBottom: "15px",
    };
    return {
      className: backgroundColor,
      style: style,
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
                  onSelectEvent={(slotInfo) => {
                    var endd = new Date(props.endDate);
                    endd.setDate(endd.getDate() + 1);

                    if (slotInfo.color == "azure") {
                      if (
                        slotInfo.start <= new Date() &&
                        slotInfo.start <= endd &&
                        slotInfo.start >= new Date(props.startDate)
                      ) {
                        addNewEventAlert(slotInfo, false);
                      }
                    } else if (
                      slotInfo.start <= new Date() &&
                      slotInfo.start <= endd &&
                      slotInfo.start >= new Date(props.startDate)
                    ) {
                      console.log(endd);
                      addNewEventAlert(slotInfo, true);
                    }
                  }}
                  onSelectSlot={(slotInfo) => {}}
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
            <CardFooter stats className={classes.cardFooter}>
              <div style={{ float: "left" }}>
                <h6 className={classes.legendTitle}>.</h6>
                <FontAwesomeIcon icon={faCircle} style={{ color: "#1caaba" }} />
                Holiday
                <FontAwesomeIcon
                  icon={faCircle}
                  style={{ color: "#eda915", marginLeft: "30px" }}
                />
                Leave
                <FontAwesomeIcon
                  icon={faCircle}
                  style={{ color: "red", marginLeft: "30px" }}
                />
                Weekend
                <FontAwesomeIcon
                  icon={faCircle}
                  style={{ color: "gray", marginLeft: "30px" }}
                />
                Weekdays
              </div>
              <div>
                <h5
                  className={classes.legendTitle}
                  style={{ color: "#345282", paddingLeft: "100px" }}
                >
                  Enter 'L' for Leave
                </h5>
                <h4
                  className={classes.legendTitle}
                  style={{ color: "#345282", paddingLeft: "100px" }}
                >
                  Total Hours Worked:{hours}
                </h4>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
