/*eslint-disable*/

import React, { useState, useEffect, useContext } from "react";
import AuthContext from "store/auth-context";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
// material-ui icons
import Room from "@material-ui/icons/Work";

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
import { tooltip } from "assets/jss/material-dashboard-pro-react.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

import AddClientModal from "components/Modal/Consultant/AddConsultantModal";
import DeleteModal from "components/Modal/DeleteModal";
import EditClientModal from "components/Modal/Consultant/EditConsultantModal";

import ClientDetail from "./consultantdetails";

const useStyles = makeStyles(styles);

export default function Consultant(props) {
  const ctx = useContext(AuthContext);
  const [mode, setMode] = useState(true);
  const [ClientDetailId, setClientDetailId] = useState();
  const [ClientDetailName, setClientDetailName] = useState();
  const [ClientData, setClientData] = useState([]);
  const [Response, setResponse] = useState(false);
  function hello() {
    axios
      .get(`/consultant/list`, {
        headers: {
          Authorization: `Bearer ${props.header.token}`,
        },
      })
      .then(function (response) {
        if (response.status === 401) {
          ctx.logout();
        } else {
          const data = response.data.payload;
          if (data) {
            const transData = data.map((item) => Object.values(item));
            const ddata = transData.map((item) =>
              item.filter((dada) => dada !== null)
            );
            setClientData(ddata);
          }
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
      method: "get",
      url: `/consultant/delete?id=${id}`,

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
                        token={props.header}
                        hello={hello}
                      ></AddClientModal>
                    </CardIcon>
                    <h3 style={{ color: "#345282", paddingLeft: "15px" }}>
                      Consultant List
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <ReactTable
                      data={ClientData.map((prop, key) => {
                        return {
                          id: key,
                          firstname: prop[1],
                          lastname: prop[2],
                          employeeId: prop[3],
                          email: prop[5],
                          phone: prop[4],
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
                                    hello={hello}
                                    token={props.header}
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
                                title="consultant jobs"
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
                          Header: "First Name",
                          accessor: "firstname",
                        },
                        {
                          Header: "Last Name",
                          accessor: "lastname",
                        },
                        {
                          Header: "Email Id",
                          accessor: "email",
                        },
                        {
                          Header: "Contact No",
                          accessor: "phone",
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
                      Consultant List
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
