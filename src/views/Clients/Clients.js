/*eslint-disable*/
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "store/auth-context";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { tooltip } from "assets/jss/material-dashboard-pro-react.js";
import Tooltip from "@material-ui/core/Tooltip";
// material-ui icons
import Room from "@material-ui/icons/Room";

import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "components/ReactTable/ReactTable.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

import AddClientModal from "components/Modal/AddClientModal";
import DeleteModal from "components/Modal/DeleteModal";
import EditClientModal from "components/Modal/EditClientModal";

import ClientDetail from "./ClientDetail";

const useStyles = makeStyles(styles);

export default function ExtendedTables(props) {
  const ctx = useContext(AuthContext);
  const [mode, setMode] = useState(true);
  const [ClientDetailId, setClientDetailId] = useState();
  const [ClientDetailName, setClientDetailName] = useState();
  const [ClientData, setClientData] = useState([]);
  const [Response, setResponse] = useState(false);
  function hello() {
    axios
      .get(`/client/list`, {
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
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 401) {
            ctx.logout();
          }
        }
      });
  }

  useEffect(() => {
    hello();
  }, []);

  const classes = useStyles();

  const deleteHandler = (id) => {
    axios({
      method: "post",
      url: "/client/delete",
      data: {
        userId: props.header.id,
        clientId: id,
      },
      headers: {
        Authorization: `Bearer ${props.header.token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          ctx.logout();
        } else {
          hello();
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 401) {
            ctx.logout();
          }
        }
      });
  };

  return (
    <>
      {mode ? (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              {Response ? (
                <>
                  <CardHeader color="rose" icon>
                    <CardIcon style={{ float: "right" }}>
                      <AddClientModal
                        hello={hello}
                        token={props.header}
                      ></AddClientModal>
                    </CardIcon>
                    <h3 style={{ color: "#345282", paddingLeft: "15px" }}>
                      Client List
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <ReactTable
                      data={ClientData.map((prop, key) => {
                        return {
                          id: key,
                          name: prop[1],
                          clientId: prop[0],
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
                                  <EditClientModal
                                    prop={prop}
                                    token={props.header}
                                    hello={hello}
                                  ></EditClientModal>
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
                                title="client locations"
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <Button
                                  round
                                  onClick={() => {
                                    setMode(false);
                                    setClientDetailId(prop[0]);
                                    setClientDetailName(prop[1]);
                                  }}
                                  color="info"
                                  className={
                                    classes.actionButton +
                                    " " +
                                    classes.actionButtonRound
                                  }
                                >
                                  <Room className={classes.icon} />
                                </Button>
                              </Tooltip>
                            </div>
                          ),
                        };
                      })}
                      columns={[
                        {
                          Header: "Client Id",
                          accessor: "clientId",
                        },
                        {
                          Header: "Client Name",
                          accessor: "name",
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
                    <CardIcon style={{ float: "right" }}>
                      <AddClientModal token={props.header}></AddClientModal>
                    </CardIcon>
                    <h3 style={{ color: "#345282", paddingLeft: "15px" }}>
                      Client List
                    </h3>
                  </CardHeader>
                  <h4 style={{ textAlign: "center" }}>Loading...</h4>
                </>
              )}
            </Card>
          </GridItem>
        </GridContainer>
      ) : (
        <ClientDetail
          click={() => {
            setMode(true);
          }}
          header={props.header}
          clientId={ClientDetailId}
          clientName={ClientDetailName}
        ></ClientDetail>
      )}
    </>
  );
}
