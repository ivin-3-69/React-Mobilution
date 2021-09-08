/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "components/ReactTable/ReactTable.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

import ArrowBack from "@material-ui/icons/ArrowBack";

import DeleteModal from "components/Modal/DeleteModal";
import AddModal from "components/Modal/Consultant/AddConsultantLocationModal";
import EditModal from "components/Modal/Consultant/EditConsultantLoactionModal";

const useStyles = makeStyles(styles);

const ClientDetail = (props) => {
  const [ClientData, setClientData] = useState([]);
  const [Response, setResponse] = useState(false);
  const [lastDate, setlastDate] = useState("1 Jan 2019");
  function hello() {
    axios
      .get(`/assign/list?id=${props.clientId}`, {
        headers: {
          Authorization: `Bearer ${props.header.token}`,
        },
      })
      .then(function (response) {
        const data = response.data.payload;
        if (data) {
          if (data[0]) {
            const transData = data.map((item) => Object.values(item));
            const ddata = transData.map((item) =>
              item.filter((dada) => dada !== null)
            );
            setClientData(ddata);
            setlastDate(data[0].endDate);
          }
        }

        setResponse(true);
      });
  }
  useEffect(() => {
    hello();
  }, []);

  const deleteHandler = (id) => {
    const deleteurl = `/assign/remove?id=${id}`;
    axios({
      method: "get",
      url: deleteurl,
      headers: {
        Authorization: `Bearer ${props.header.token}`,
      },
    }).then((response) => {
      hello();
    });
  };

  const classes = useStyles();

  return (
    <>
      {Response ? (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon style={{ float: "left" }}>
                  <Button justIcon color="primary" round onClick={props.click}>
                    <ArrowBack />
                  </Button>
                </CardIcon>
                <CardIcon style={{ float: "right" }}>
                  <AddModal
                    token={props.header}
                    id={props.clientId}
                    hello={hello}
                    lastDate={lastDate}
                  ></AddModal>
                </CardIcon>
                <h3 style={{ color: "#345282", paddingLeft: "100px" }}>
                  {props.clientName} locations
                </h3>
              </CardHeader>
              {/* {console.log(ClientData)} */}
              <CardBody>
                <ReactTable
                  data={ClientData.map((prop, key) => {
                    return {
                      id: key,
                      clientLocationName: prop[9].locationName,
                      startDate: prop[2],
                      endDate: prop[3],
                      actions: (
                        // we've added some custom button actions

                        <div className={classes.right}>
                          <Tooltip
                            id="tooltip-top"
                            title="edit consultant"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <Button
                              round
                              color="success"
                              className={
                                classes.actionButton +
                                " " +
                                classes.actionButtonRound
                              }
                            >
                              <EditModal
                                id={props.clientId}
                                token={props.header}
                                prop={prop}
                                hello={hello}
                              ></EditModal>
                              {/* {console.log(prop[8].id)} */}
                            </Button>
                          </Tooltip>

                          <Tooltip
                            id="tooltip-top"
                            title="unassign consultant"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
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
                                text={prop[9].locationName}
                              ></DeleteModal>
                            </Button>
                          </Tooltip>
                        </div>
                      ),
                    };
                  })}
                  columns={[
                    {
                      Header: "Client Location Name",
                      accessor: "clientLocationName",
                    },
                    {
                      Header: "Start Date",
                      accessor: "startDate",
                    },
                    {
                      Header: "End Date",
                      accessor: "endDate",
                    },
                    {
                      Header: "Actions",
                      accessor: "actions",
                    },
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      ) : (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon style={{ float: "left" }}>
                  <Button justIcon color="primary" round onClick={props.click}>
                    <ArrowBack />
                  </Button>
                </CardIcon>
                <CardIcon style={{ float: "right" }}>
                  <AddModal token={props.header} id={props.clientId}></AddModal>
                </CardIcon>
                <h3 style={{ color: "#345282", paddingLeft: "100px" }}>
                  {props.clientName} locations
                </h3>
              </CardHeader>
              <h4 style={{ textAlign: "center" }}>Loading...</h4>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </>
  );
};

export default ClientDetail;
