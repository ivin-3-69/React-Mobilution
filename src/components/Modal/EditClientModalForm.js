/*eslint-disable*/

import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
const useStyles = makeStyles(styles);

export default function ModalForm(props) {
  const submitHandler = (event) => {
    event.preventDefault();
    if (event.target[0].value) {
      axios({
        method: "post",
        url: "/client/save",
        data: {
          client: event.target[0].value,
          userId: props.token.id,
          clientId: props.prop[0],
        },
        headers: {
          Authorization: `Bearer ${props.token.token}`,
        },
      }).then((response) => {
        props.hello();
      });

      props.love();
    }
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <form onSubmit={submitHandler}>
              <CustomInput
                labelText="Client Name"
                id="ClientName"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  defaultValue: `${props.prop[1]}`,
                  type: "text",
                }}
              />
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
