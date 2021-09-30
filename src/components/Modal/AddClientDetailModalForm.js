/*eslint-disable*/

import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
const useStyles = makeStyles(styles);

export default function ModalForm(props) {
  // const [simpleSelect, setSimpleSelect] = React.useState("");
  const [dropdowntitle, setDropDownTitle] = useState("City");
  const [dropdowntitle2, setDropDownTitle2] = useState("City");
  const [dropdowntitle3, setDropDownTitle3] = useState("Delivery Manager");
  const [dropdowntitle4, setDropDownTitle4] = useState("Account Manager");
  const [citynamelist, setCitynamelist] = useState(["city"]);
  const [cityidlist, setCityidlist] = useState([1]);
  const [chosenId, setChosenId] = useState(1);
  const [chosenId2, setChosenId2] = useState(1);
  const [chosenId3, setChosenId3] = useState(1);
  const [chosenId4, setChosenId4] = useState(1);
  const [checked, setChecked] = React.useState(false);
  const [usernamelist, setUsernamelist] = useState(["ivin"]);
  const [useridlist, setUseridlist] = useState([1]);
  const [gstflag, setgstflag] = useState(null);
  const [numberflag, setnumberflag] = useState(null);
  const [panflag, setpanflag] = useState(null);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "/city/list",

      headers: {
        Authorization: `Bearer ${props.token.token}`,
      },
    }).then((response) => {
      const citydata = response.data.payload;
      const citytransfferedData = citydata.map((item) => Object.values(item));
      const ddata = citytransfferedData.map((item) => item.splice(0, 2));
      const cityList = ddata.map((item) => item.splice(0, 1));
      var cityname1d = [];
      var cityid1d = [];

      for (var i = 0; i < ddata.length; i++) {
        cityname1d = cityname1d.concat(ddata[i]);
      }
      for (var j = 0; j < cityList.length; j++) {
        cityid1d = cityid1d.concat(cityList[j]);
      }

      setCitynamelist(cityname1d);
      setCityidlist(cityid1d);
    });
    axios({
      method: "get",
      url: "/user/list",

      headers: {
        Authorization: `Bearer ${props.token.token}`,
      },
    }).then((response) => {
      const userdata = response.data.payload;
      const usertransferredData = userdata.map((item) => Object.values(item));
      const userfinaldata = usertransferredData.map((item) =>
        item.splice(0, 3)
      );
      const username2DList = userfinaldata.map((item) => item.splice(2, 3));
      const userid2DList = userfinaldata.map((item) => item.splice(0, 1));

      var username1d = [];
      var userid1d = [];

      for (var i = 0; i < username2DList.length; i++) {
        username1d = username1d.concat(username2DList[i]);
      }
      for (var i = 0; i < userid2DList.length; i++) {
        userid1d = userid1d.concat(userid2DList[i]);
      }
      setUsernamelist(username1d);
      setUseridlist(userid1d);
    });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    let flag1 = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
      event.target[1].value
    );
    let flag2 = /^[0-9]{10}$/.test(event.target[5].value);
    let flag3 = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(event.target[2].value);
    let flag4 =
      event.target[0].value &&
      event.target[1].value &&
      event.target[2].value &&
      event.target[4].value &&
      event.target[5].value &&
      event.target[6].value &&
      event.target[9].value &&
      event.target[10].value &&
      event.target[11].value &&
      event.target[12].value &&
      event.target[13].value &&
      event.target[15].value &&
      event.target[16].value &&
      event.target[17].value &&
      event.target[18].value &&
      event.target[19].value;
    if (flag1 && flag2 && flag3 && flag4) {
      axios({
        method: "post",
        url: "/clientlocation/save",
        data: {
          locationName: event.target[0].value,
          contactName: event.target[4].value,
          email: event.target[6].value,
          mobile: event.target[5].value,
          gstNo: event.target[1].value,
          panNo: event.target[2].value,

          isSez: checked ? "Y" : "N",
          billingAddress: {
            address: event.target[9].value,
            cityId: chosenId,
            landmark: event.target[10].value,
            building: event.target[11].value,
            pincode: event.target[13].value,
            street: event.target[12].value,
            doorNo: "123-5",
          },
          shippingAddress: {
            address: event.target[15].value,
            cityId: chosenId2,
            landmark: event.target[16].value,
            building: event.target[17].value,
            pincode: event.target[19].value,
            street: event.target[18].value,
            doorNo: "123-5",
          },
          client: {
            id: props.id,
          },
          deliveryManager: {
            id: chosenId3,
          },
          accountManager: {
            id: chosenId4,
          },
        },
        headers: {
          Authorization: `Bearer ${props.token.token}`,
        },
      }).then((response) => {
        props.hello();
      });

      props.love();
    }
    setgstflag(!flag1);
    setnumberflag(!flag2);
    setpanflag(!flag3);
  };

  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <form onSubmit={submitHandler}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <CustomInput
                    labelText="Location Name"
                    id="LocationName"
                    required
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="GST No"
                    id="GstNO"
                    error={gstflag}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="Pan No"
                    id="panNo"
                    error={panflag}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomDropdown
                    buttonText={dropdowntitle3}
                    dropdownList={usernamelist}
                    buttonProps={{}}
                    onClick={(key) => {
                      setDropDownTitle3(usernamelist[key]);
                      setChosenId3(useridlist[key]);
                    }}
                  />
                </div>
                <div style={{ paddingLeft: "15px" }}>
                  <CustomInput
                    labelText="Contact Name"
                    id="ContactName"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="Contact No"
                    id="ContactNo"
                    error={numberflag}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="Email Id"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomDropdown
                    buttonText={dropdowntitle4}
                    dropdownList={usernamelist}
                    buttonProps={{}}
                    onClick={(key) => {
                      setDropDownTitle4(usernamelist[key]);
                      setChosenId4(useridlist[key]);
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: "15px",
                }}
              >
                <p>is Sez:</p>
                <Checkbox
                  checked={checked}
                  color="default"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <h5>Billing address</h5>
                  <CustomInput
                    labelText="Address"
                    id="address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="Landmark"
                    id="landmark"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="Building"
                    id="building"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="Street"
                    id="street"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="Pincode"
                    id="pincode"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomDropdown
                    buttonText={dropdowntitle}
                    dropdownList={citynamelist}
                    buttonProps={{}}
                    onClick={(key) => {
                      setDropDownTitle(citynamelist[key]);
                      setChosenId(cityidlist[key]);
                    }}
                  />
                </div>
                <div style={{ paddingLeft: "15px" }}>
                  <h5>Shipping address</h5>
                  <CustomInput
                    labelText="Address"
                    id="address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="Landmark"
                    id="landmark"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="Building"
                    id="building"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="Street"
                    id="street"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="Pincode"
                    id="pincode"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                    }}
                  />
                  <CustomDropdown
                    buttonText={dropdowntitle2}
                    dropdownList={citynamelist}
                    buttonProps={{}}
                    onClick={(key) => {
                      setDropDownTitle2(citynamelist[key]);
                      setChosenId2(cityidlist[key]);
                    }}
                  />
                </div>
              </div>

              <Button type="submit" color="rose">
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
