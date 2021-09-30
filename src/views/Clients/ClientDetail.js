/*eslint-disable*/
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "store/auth-context";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Event from "@material-ui/icons/Event";
import { tooltip } from "assets/jss/material-dashboard-pro-react.js";
import Tooltip from "@material-ui/core/Tooltip";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "components/ReactTable/ReactTable.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";
import ClientHolidays from "./ClientHoliday";

import ArrowBack from "@material-ui/icons/ArrowBack";

import DeleteModal from "components/Modal/DeleteModal";
import AddModal from "components/Modal/AddClientDetailModal";
import EditModal from "components/Modal/EditClientDetailModal";

const useStyles = makeStyles(styles);

const ClientDetail = (props) => {
  const ctx = useContext(AuthContext);

  const [ClientData, setClientData] = useState([]);
  const [Response, setResponse] = useState(false);
  const [mode, setMode] = useState(true);
  const [ClientLocationId, setClientLocationId] = useState();
  function hello() {
    axios
      .get(`/clientlocation/byclient?id=${props.clientId}`, {
        headers: {
          Authorization: `Bearer ${props.header.token}`,
        },
      })
      .then(function (response) {
        if (response.status === 401) {
          ctx.logout();
        } else {
          const data = response.data.payload;
          const transData = data.map((item) => Object.values(item));
          const ddata = transData.map((item) =>
            item.filter((dada) => dada !== null)
          );
          setClientData(ddata);
          setResponse(true);
        }
      });
  }

  useEffect(() => {
    hello();
  }, []);

  const deleteHandler = (id) => {
    const deleteurl = `/clientlocation/delete?id=${id}`;
    axios({
      method: "get",
      url: deleteurl,
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
  };

  const classes = useStyles();

  return (
    <>
      {mode ? (
        <>
          {Response ? (
            <GridContainer>
              <GridItem xs={12}>
                <Card>
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
                      <AddModal
                        token={props.header}
                        hello={hello}
                        id={props.clientId}
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
                          LocationName: prop[1],
                          GstNO: prop[5],
                          ContactName: prop[2],
                          ContactNo: prop[4],
                          actions: (
                            // we've added some custom button actions

                            <div className={classes.right}>
                              <Tooltip
                                id="tooltip-top"
                                title="edit"
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
                                    locationid={prop[0]}
                                    billingAddressId={prop[8].id}
                                    hello={hello}
                                    prop={prop}
                                  ></EditModal>
                                  {/* {console.log(prop[8].id)} */}
                                </Button>
                              </Tooltip>
                              <Tooltip
                                id="tooltip-top"
                                title="delete"
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
                                    text={prop[1]}
                                  ></DeleteModal>
                                </Button>
                              </Tooltip>
                              <Tooltip
                                id="tooltip-top"
                                title="client holiday"
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <Button
                                  round
                                  onClick={() => {
                                    setMode(false);
                                    setClientLocationId(prop[0]);
                                  }}
                                  color="info"
                                  className={
                                    classes.actionButton +
                                    " " +
                                    classes.actionButtonRound
                                  }
                                >
                                  <Event className={classes.icon} />
                                </Button>
                              </Tooltip>
                            </div>
                          ),
                        };
                      })}
                      columns={[
                        {
                          Header: "Location Name",
                          accessor: "LocationName",
                        },
                        {
                          Header: "GST NO",
                          accessor: "GstNO",
                        },
                        {
                          Header: "Contact Name",
                          accessor: "ContactName",
                        },
                        {
                          Header: "Contact No",
                          accessor: "ContactNo",
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
                      <AddModal
                        token={props.header}
                        id={props.clientId}
                      ></AddModal>
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
      ) : (
        <ClientHolidays
          header={props.header}
          clientlocationid={ClientLocationId}
          click={() => {
            setMode(true);
          }}
        ></ClientHolidays>
      )}
    </>
  );
};

export default ClientDetail;
