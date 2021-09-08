/*eslint-disable*/

import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Add from "@material-ui/icons/Add";
// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-pro-react/modalStyle.js";
import ModalForm from "./AddConsultantLocationFormModal";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal(props) {
  const [modal, setModal] = React.useState(false);
  const classes = useStyles();

  //  console.log(props.token)
  return (
    <div>
      <Button
        justIcon
        round
        onClick={() => setModal(true)}
        className={classes.btn}
        styles={{ float: "right" }}
      >
        <Add />
      </Button>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modalscroll,
        }}
        open={modal}
        transition={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            justIcon
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="transparent"
            onClick={() => setModal(false)}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Add New Consultant</h4>
        </DialogTitle>
        <DialogContent className={classes.modalBody}>
          <ModalForm
            token={props.token}
            id={props.id}
            love={() => setModal(false)}
            hello={props.hello}
            lastDate={props.lastDate}
          ></ModalForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
