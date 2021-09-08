import { grayColor } from "assets/jss/material-dashboard-pro-react.js";

const modalStyle = () => ({
  modalRoot: {
    overflow: "scroll",
    alignItems: "unset",
    justifyContent: "unset",
  },
  modal: {
    margin: "auto",
    borderRadius: "6px",
    marginTop: "100px !important",
    overflow: "auto",
    maxHeight: "unset",
    position: "relative",
    height: "fit-content",
    paddingRight: "15px",
  },
  modalscroll: {
    width: "100%",
    margin: "auto",
    borderRadius: "6px",
    marginTop: "100px !important",
    position: "relative",
    height: "80%",
    paddingRight: "15px",
    overflow: "scroll",
    display: "block",
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "0",
    paddingLeft: "24px",
    minHeight: "16.43px",
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.42857143",
  },
  modalCloseButton: {
    color: grayColor[0],
    marginTop: "-12px",
    WebkitAppearance: "none",
    padding: "0",
    cursor: "pointer",
    background: "0 0",
    border: "0",
    fontSize: "inherit",
    opacity: ".9",
    textShadow: "none",
    fontWeight: "700",
    lineHeight: "1",
    float: "right",
  },
  modalClose: {
    width: "16px",
    height: "16px",
  },
  btn: {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
    backgroundColor: "#29b300",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#32d402",
      color: "#fff",
    },
  },
  btnsmall: {
    margin: "0 0 0 0",
    padding: "0px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0px",
    },
    borderRadius: "50%",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#fff",
    },
  },
  modalBody: {
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
    overflow: "visible",
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "0",
    margin: "0",
  },
  modalFooterCenter: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  instructionNoticeModal: {
    marginBottom: "25px",
  },
  imageNoticeModal: {
    maxWidth: "150px",
  },
  modalSmall: {
    width: "300px",
  },
  modalSmallBody: {
    paddingTop: "0",
  },
  modalSmallFooterFirstButton: {
    margin: "0",
    paddingLeft: "16px",
    paddingRight: "16px",
    width: "auto",
  },
  modalSmallFooterSecondButton: {
    marginBottom: "0",
    marginLeft: "5px",
  },
});

export default modalStyle;
