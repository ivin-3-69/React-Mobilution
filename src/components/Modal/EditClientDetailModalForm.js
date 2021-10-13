/*eslint-disable*/

import React, { useState, useEffect } from "react";

// @material-ui/core components
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
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
  const [citynamelist, setCitynamelist] = useState(["city"]);
  const [cityidlist, setCityidlist] = useState([1]);
  const [usernamelist, setUsernamelist] = useState(["ivin"]);
  const [useridlist, setUseridlist] = useState([1]);
  const [gstflag, setgstflag] = useState(null);
  const [numberflag, setnumberflag] = useState(null);
  const [panflag, setpanflag] = useState(null);
  const [pincodeflag1, setpincodeflag1] = useState(null);
  const [pincodeflag2, setpincodeflag2] = useState(null);
  useEffect(() => {
    axios({
      method: "get",
      url: "/city/list",

      headers: {
        Authorization: `Bearer ${props.token.token}`,
      },
    }).then((response) => {
      const data = response.data.payload;
      const transData = data.map((item) => Object.values(item));
      const ddata = transData.map((item) => item.splice(0, 2));
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

  const [chosenId, setChosenId] = useState(props.prop[8].cityId);
  const [chosenId2, setChosenId2] = useState(props.prop[9].cityId);
  const [chosenId3, setChosenId3] = useState(props.prop[11].id);
  const [chosenId4, setChosenId4] = useState(props.prop[12].id);
  const [dropdowntitle, setDropDownTitle] = useState("City");
  const [dropdowntitle2, setDropDownTitle2] = useState("City");
  const [dropdowntitle3, setDropDownTitle3] = useState("Delivery Manager");
  const [dropdowntitle4, setDropDownTitle4] = useState("Account Manager");
  const [checked, setChecked] = React.useState(
    props.prop[7] === "Y" ? true : false
  );
  // console.log();
  useEffect(() => {
    setDropDownTitle(
      citynamelist[
        cityidlist.findIndex((element) => element === props.prop[8].cityId)
      ]
    );
    setDropDownTitle2(
      citynamelist[
        cityidlist.findIndex((element) => element === props.prop[9].cityId)
      ]
    );
    setDropDownTitle3(
      usernamelist[
        useridlist.findIndex((element) => element === props.prop[11].id)
      ]
    );
    setDropDownTitle4(
      usernamelist[
        useridlist.findIndex((element) => element === props.prop[12].id)
      ]
    );
  }, [
    citynamelist[
      cityidlist.findIndex((element) => element === props.prop[8].cityId)
    ],
    usernamelist[
      useridlist.findIndex((element) => element === props.prop[12].id)
    ],
  ]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let flag1 = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
      event.target[1].value
    );
    let flag2 = /^[0-9]{10}$/.test(event.target[5].value);
    let flag3 = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(event.target[2].value);
    let flag5 = /^[0-9]{6}$/.test(event.target[13].value);
    let flag6 = /^[0-9]{6}$/.test(event.target[19].value);
    let flag4;
    if (
      event.target[0].value &&
      event.target[1].value &&
      event.target[2].value &&
      event.target[4].value &&
      event.target[5].value > 0 &&
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
      event.target[19].value
    ) {
      flag4 = true;
    } else {
      flag4 = false;
    }
    console.log(flag1, flag2, flag3, flag4, flag5, flag6);
    if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
      axios({
        method: "post",
        url: "/clientlocation/save",
        data: {
          id: props.prop[0],
          locationName: event.target[0].value,
          contactName: event.target[4].value,
          email: event.target[6].value,
          mobile: event.target[5].value,
          gstNo: event.target[1].value,
          panNo: event.target[2].value,

          isSez: checked ? "Y" : "N",
          billingAddress: {
            id: props.prop[8].id,
            address: event.target[9].value,
            cityId: chosenId,
            landmark: event.target[10].value,
            building: event.target[11].value,
            pincode: event.target[13].value,
            street: event.target[12].value,
            doorNo: "123-5",
          },
          shippingAddress: {
            id: props.prop[9].id,
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
    setpincodeflag1(!flag5);
    setpincodeflag2(!flag6);
  };
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
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      defaultValue: `${props.prop[1]}`,
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
                      defaultValue: `${props.prop[5]}`,
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
                      defaultValue: `${props.prop[6]}`,
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
                      defaultValue: `${props.prop[2]}`,
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
                      defaultValue: `${props.prop[4]}`,
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
                      defaultValue: `${props.prop[3]}`,
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
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p>Is Sez:</p>
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
                      defaultValue: `${props.prop[8].address}`,
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
                      defaultValue: `${props.prop[8].landmark}`,
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
                      defaultValue: `${props.prop[8].building}`,
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="street"
                    id="street"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      defaultValue: `${props.prop[8].street}`,
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="pincode"
                    id="pincode"
                    error={pincodeflag1}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      defaultValue: `${props.prop[8].pincode}`,
                      type: "text",
                    }}
                  />

                  <CustomDropdown
                    buttonText={dropdowntitle}
                    dropdownList={citynamelist}
                    buttonProps={{
                      round: true,
                      color: "white",
                    }}
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
                      defaultValue: `${props.prop[9].address}`,
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
                      defaultValue: `${props.prop[9].landmark}`,
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
                      defaultValue: `${props.prop[9].building}`,
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
                      defaultValue: `${props.prop[9].street}`,
                      type: "text",
                    }}
                  />
                  <CustomInput
                    labelText="Pincode"
                    id="pincode"
                    error={pincodeflag2}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      defaultValue: `${props.prop[9].pincode}`,
                      type: "text",
                    }}
                  />
                  <CustomDropdown
                    buttonText={dropdowntitle2}
                    dropdownList={citynamelist}
                    buttonProps={{
                      round: true,
                      color: "white",
                    }}
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
