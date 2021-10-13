/*eslint-disable*/

import React, { useState, useEffect, useContext } from "react";
import AuthContext from "store/auth-context";
import { CSVLink, CSVDownload } from "react-csv";
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
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "components/ReactTable/ReactEditableTable";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

// import EditClientModal from "components/Modal/BillableMonth/EditBillModal";
import EditClientModal from "components/Modal/invoice/EditInvoiceModal";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

const useStyles = makeStyles(styles);

export default function ExtendedTables(props) {
  const ctx = useContext(AuthContext);
  const classes = useStyles();
  function join(t, a, s) {
    if (t) {
      const t1 = new Date(t);
      function format(m) {
        let f = new Intl.DateTimeFormat("en", m);
        return f.format(t1);
      }
      return a.map(format).join(s);
    }
    return t;
  }

  let a = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }];
  const [yearArray, setyearArray] = useState([]);
  const [BillMonth, setBillMonth] = useState(
    [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ][new Date().getMonth()]
  );
  const [BillMonthNumber, setBillMonthNumber] = useState(
    new Date().getMonth() + 1
  );
  const [dropdowntitle, setDropDownTitle] = useState(
    [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ][new Date().getMonth()]
  );
  const [ClientData, setClientData] = useState([]);
  const [csvData, setcsvData] = useState([]);
  const [Response, setResponse] = useState(false);
  const [billyear, setbillyear] = useState(new Date().getFullYear());
  const [dropdowntitle2, setDropDownTitle2] = useState(2021);
  function hello() {
    axios
      .get(
        `/invoice/consultant/list?month=${BillMonthNumber}&year=${billyear}`,
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
          const data = response.data.payload;
          const transData = data.map((item) => Object.values(item));
          setClientData(transData);
          setcsvData([
            [
              "Consultant FirstName",
              "Consultant LastName",
              "Client LocationName",
              "Client Name",
              "Po Number",
              "Bill StartDate",
              "Bill EndDate",
              "Bill Rate",
              "Bill Type",
              "Bill Amount",
              "Taxes",
              "Total Amount",
              "Invoice No",
              "Invoice Date",
              "Invoice Status",
              "Payment Date",
              "Invoice Id",
              "Consultant Id",
              "Billable Day /Hour",
            ],
            ...transData,
          ]);
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
  var filenamee = `${BillMonth}-${billyear}.csv`;

  useEffect(() => {
    hello();
    var array = [];
    if (billyear > 0) {
      for (let i = -5; i < 6; i++) {
        array.push(billyear + i);
      }
    } else {
      for (let i = -5; i < 6; i++) {
        array.push(new Date().getFullYear() + i);
      }
    }
    setyearArray(array);
  }, [BillMonth, billyear]);

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          {Response ? (
            <>
              <CardHeader color="rose" icon>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <h3 style={{ color: "#345282", paddingLeft: "15px" }}>
                    Invoice
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {ClientData.length > 0 && (
                      <CSVLink filename={filenamee} data={csvData}>
                        <Button
                          style={{
                            marginRight: 10,
                            paddingBottom: 13,
                            paddingTop: 13,
                          }}
                          color="primary"
                          size="sm"
                        >
                          Download
                        </Button>
                      </CSVLink>
                    )}

                    {ClientData.length > 0 &&
                      BillMonthNumber <= new Date().getMonth() + 1 &&
                      BillMonthNumber >= new Date().getMonth() - 1 &&
                      billyear === new Date().getFullYear() && (
                        <Button
                          style={{ marginRight: 25, marginBottom: 20 }}
                          color="success"
                          onClick={() => {
                            axios
                              .get(
                                `/invoice/generate?month=${BillMonthNumber}&year=${billyear}`,
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
                          }}
                        >
                          Generate
                        </Button>
                      )}

                    <CustomDropdown
                      buttonText={dropdowntitle}
                      dropdownList={[
                        "JAN",
                        "FEB",
                        "MAR",
                        "APR",
                        "MAY",
                        "JUN",
                        "JUL",
                        "AUG",
                        "SEP",
                        "OCT",
                        "NOV",
                        "DEC",
                      ]}
                      buttonProps={{}}
                      onClick={(key) => {
                        setDropDownTitle(
                          [
                            "JAN",
                            "FEB",
                            "MAR",
                            "APR",
                            "MAY",
                            "JUN",
                            "JUL",
                            "AUG",
                            "SEP",
                            "OCT",
                            "NOV",
                            "DEC",
                          ][key]
                        );
                        setBillMonth(
                          [
                            "JAN",
                            "FEB",
                            "MAR",
                            "APR",
                            "MAY",
                            "JUN",
                            "JUL",
                            "AUG",
                            "SEP",
                            "OCT",
                            "NOV",
                            "DEC",
                          ][key]
                        );
                        setBillMonthNumber(key + 1);
                      }}
                    />
                    <CustomDropdown
                      buttonText={dropdowntitle2}
                      dropdownList={yearArray}
                      buttonProps={{}}
                      onClick={(key) => {
                        setDropDownTitle2(yearArray[key]);
                        setbillyear(yearArray[key]);
                      }}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={ClientData.map((prop, key) => {
                    var postfix = "days";
                    if (prop[8] === "Hourly") {
                      postfix = "hrs";
                    }
                    return {
                      id: key,
                      firstName: `${prop[0]} ${prop[1]}`,
                      clientName: `${prop[3]}, ${prop[2]}`,
                      poNo: prop[4],
                      startDate: `${prop[5]} to ${prop[6]}`,
                      billRate: prop[7],
                      billType: prop[8],
                      billableAmount: prop[9],
                      taxes: prop[10],
                      totalAmount: prop[11],
                      invoiceNo: prop[12],
                      invoiceDate: prop[13],
                      invoiceStatus: prop[14],
                      paymentDate: prop[15],
                      invoiceId: prop[16],
                      consultantId: prop[17],
                      hoursOrDays: `${prop[18]} ${postfix}`,
                      actions: (
                        <div className={classes.right}>
                          {BillMonthNumber > new Date().getMonth() - 1 &&
                          billyear >= new Date().getFullYear() ? (
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
                                  BillMonth={BillMonth}
                                  BillMonthNumber={BillMonthNumber}
                                  billyear={billyear}
                                  hello={hello}
                                ></EditClientModal>
                              </Button>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              id="tooltip-top"
                              title="edit"
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <Button
                                round
                                disabled
                                className={
                                  classes.actionButton +
                                  " " +
                                  classes.actionButtonRound
                                }
                              >
                                <EditClientModal
                                  prop={prop}
                                  token={props.header}
                                  BillMonth={BillMonth}
                                  BillMonthNumber={BillMonthNumber}
                                  billyear={billyear}
                                  hello={hello}
                                ></EditClientModal>
                              </Button>
                            </Tooltip>
                          )}
                        </div>
                      ),
                    };
                  })}
                  columns={[
                    {
                      Header: "Consultant",
                      accessor: "firstName",
                    },
                    {
                      Header: "Client",
                      accessor: "clientName",
                    },
                    {
                      Header: "Po No",
                      accessor: "poNo",
                    },
                    {
                      Header: "Bill Date",
                      accessor: "startDate",
                    },
                    {
                      Header: "Day/Hour",
                      accessor: "hoursOrDays",
                    },
                    {
                      Header: "Bill Rate",
                      accessor: "billRate",
                    },
                    {
                      Header: "Bill Amount",
                      accessor: "billableAmount",
                    },
                    {
                      Header: "Taxes",
                      accessor: "taxes",
                    },
                    {
                      Header: "Total Bill",
                      accessor: "totalAmount",
                    },
                    {
                      Header: "Invoice No",
                      accessor: "invoiceNo",
                    },
                    {
                      Header: "Bill Date",
                      accessor: "invoiceDate",
                    },
                    {
                      Header: "Bill Status",
                      accessor: "invoiceStatus",
                    },
                    {
                      Header: "Pymt Date",
                      accessor: "paymentDate",
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
                <h3 style={{ color: "#345282", paddingLeft: "15px" }}>
                  Invoice
                </h3>
              </CardHeader>
              <h4 style={{ textAlign: "center" }}>Loading...</h4>
            </>
          )}
        </Card>
      </GridItem>
    </GridContainer>
  );
}
