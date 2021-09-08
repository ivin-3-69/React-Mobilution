/*eslint-disable*/

import React, { useState, useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
// material-ui icons
import Room from "@material-ui/icons/Room";

import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "components/ReactTable/ReactTable.js";
import ArrowBack from "@material-ui/icons/ArrowBack";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

import AddClientModal from "components/Modal/ClientHolidays/AddHolidaysModal";
import DeleteModal from "components/Modal/DeleteModal";
import EditClientModal from "components/Modal/ClientHolidays/EditHolidaymodal";

const useStyles = makeStyles(styles);

export default function ExtendedTables(props) {
  function join(t, a, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }

  let a = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }];
  // const [checked, setChecked] = React.useState(false);
  useEffect(() => {
    axios
      .get(`/holiday/byclientlocation?id=${props.clientlocationid}`, {
        headers: {
          Authorization: `Bearer ${props.header.token}`,
        },
      })
      .then(function (response) {
        const data = response.data.payload;
        const transData = data.map((item) => Object.values(item));
        const ddata = transData.map((item) =>
          item.filter((dada) => dada !== null)
        );
        if (ddata[0]) {
          const checc = ddata[0][5];
        }
      });
  }, []);

  const [ClientData, setClientData] = useState([]);
  const [Response, setResponse] = useState(false);

  const handleChange = (event) => {
    if (event.target.checked === true) {
      axios({
        method: "post",
        url: "/holiday/save",
        data: {
          clientLocationId: props.clientlocationid,
          holidaysEntered: true,
          year: new Date().getFullYear(),
        },
        headers: {
          Authorization: `Bearer ${props.header.token}`,
        },
      }).then((response) => {
        hello();
      });
    }
  };

  function hello() {
    axios
      .get(`/holiday/byclientlocation?id=${props.clientlocationid}`, {
        headers: {
          Authorization: `Bearer ${props.header.token}`,
        },
      })
      .then(function (response) {
        const data = response.data.payload;
        const transData = data.map((item) => Object.values(item));
        const ddata = transData.map((item) =>
          item.filter((dada) => dada !== null)
        );
        setClientData(ddata);
        setResponse(true);
      });
  }
  useEffect(() => {
    hello();
  }, []);
  const classes = useStyles();

  const deleteHandler = (id) => {
    axios({
      method: "get",
      url: `/holiday/delete?id=${id}`,
      headers: {
        Authorization: `Bearer ${props.header.token}`,
      },
    }).then((response) => {
      hello();
    });
  };
  return (
    <>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            {Response ? (
              <>
                <CardHeader color="rose" icon>
                  <CardIcon style={{ float: "left" }}>
                    <Button
                      justIcon
                      color="primary"
                      round
                      onClick={props.click}
                    >
                      <ArrowBack />
                    </Button>
                  </CardIcon>
                  <CardIcon style={{ float: "right" }}>
                    <AddClientModal
                      hello={hello}
                      token={props.header}
                      id={props.clientlocationid}
                    ></AddClientModal>
                  </CardIcon>
                  <h3 style={{ color: "#345282", paddingLeft: "100px" }}>
                    Client Location Holiday List
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingTop: "8px",
                      // margin: "auto",
                      // textAlign: "center",
                    }}
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    {/* {console.log(ClientData[ClientData.length - 1][5])} */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={ClientData[ClientData.length - 1][5]}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                          onChange={handleChange}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          // icon={<Check className={classes.uncheckedIcon} />}
                        />
                      }
                      classes={{ label: classes.label }}
                      label="Holidays Set"
                    />
                  </div>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={ClientData.map((prop, key) => {
                      return {
                        id: key,
                        Date: join(new Date(prop[2]), a, " "),
                        Holiday: prop[4],
                        locationId: prop[1],
                        actions: (
                          <div className={classes.right}>
                            <Button
                              round
                              color="success"
                              className={
                                classes.actionButton +
                                " " +
                                classes.actionButtonRound
                              }
                            >
                              <EditClientModal
                                id={props.clientlocationid}
                                prop={prop}
                                hello={hello}
                                token={props.header}
                              ></EditClientModal>
                            </Button>
                            <Button
                              round
                              color="danger"
                              className={
                                classes.actionButton +
                                " " +
                                classes.actionButtonRound
                              }
                            >
                              <DeleteModal
                                id={prop[0]}
                                delete={deleteHandler}
                                text={prop[4]}
                              ></DeleteModal>
                            </Button>
                          </div>
                        ),
                      };
                    })}
                    columns={[
                      {
                        Header: "Date",
                        accessor: "Date",
                      },
                      {
                        Header: "Holiday",
                        accessor: "Holiday",
                      },
                      {
                        Header: "Actions",
                        accessor: "actions",
                      },
                    ]}
                  />
                </CardBody>
              </>
            ) : (
              <>
                <CardHeader color="rose" icon>
                  <CardIcon style={{ float: "left" }}>
                    <Button
                      justIcon
                      color="primary"
                      round
                      onClick={props.click}
                    >
                      <ArrowBack />
                    </Button>
                  </CardIcon>
                  <CardIcon style={{ float: "right" }}>
                    <AddClientModal token={props.header}></AddClientModal>
                  </CardIcon>
                  <h3 style={{ color: "#345282", paddingLeft: "100px" }}>
                    Client Location Holiday List
                  </h3>
                </CardHeader>
                <h4 style={{ textAlign: "center" }}>Loading...</h4>
              </>
            )}
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
