import buttonGroupStyle from "assets/jss/material-dashboard-pro-react/buttonGroupStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import {
  cardTitle,
  primaryColor,
  grayColor,
} from "assets/jss/material-dashboard-pro-react.js";

const extendedTablesStyle = {
  ...customCheckboxRadioSwitch,
  ...buttonGroupStyle,
  checkboxAndRadio: {
    position: "relative",
    display: "block",
    marginTop: "10px",
    marginBottom: "10px",
  },
  checkboxAndRadioHorizontal: {
    position: "relative",
    display: "block",
    "&:first-child": {
      marginTop: "10px",
    },
    "&:not(:first-child)": {
      marginTop: "-14px",
    },
    marginTop: "0",
    marginBottom: "0",
  },
  checked: {
    color: primaryColor[0] + "!important",
  },
  checkRoot: {
    padding: "6px 0px 0px 14px",
    "&:hover": {
      backgroundColor: "unset",
    },
  },
  right: {
    float: "right",
    display: "flex",
    flexDirection: "row",
  },
  center: {
    textAlign: "center",
  },
  labelRoot: {
    marginLeft: "-14px",
  },
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    paddingTop: "12px",
    color: "black",
    fontSize: "18px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex",
    transition: "0.3s ease all",
    letterSpacing: "unset",
  },
  header: {
    margin: "20px",
    paddingTop: "40",
    paddingLeft: "15",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: {
    maxWidth: "150px",
  },
  actionButton: {
    margin: "0 0 0 5px",
    padding: "5px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0px",
    },
  },
  icon: {
    verticalAlign: "middle",
    width: "17px",
    height: "17px",
    top: "-1px",
    position: "relative",
  },
  imgContainer: {
    width: "120px",
    maxHeight: "160px",
    overflow: "hidden",
    display: "block",
  },
  img: {
    width: "100%",
    height: "auto",
    verticalAlign: "middle",
    border: "0",
  },
  tdName: {
    minWidth: "200px",
    fontWeight: "400",
    fontSize: "1.5em",
  },
  tdNameAnchor: {
    color: grayColor[2],
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: "0.75em",
    fontWeight: "300",
  },
  tdNumber: {
    textAlign: "right",
    minWidth: "145px",
    fontWeight: "300",
    fontSize: "1.3em !important",
  },
  tdNumberSmall: {
    marginRight: "3px",
  },
  tdNumberAndButtonGroup: {
    lineHeight: "1 !important",
  },
  positionAbsolute: {
    position: "absolute",
    right: "0",
    top: "0",
  },
  customFont: {
    fontSize: "16px !important",
  },
  actionButtonRound: {
    width: "auto",
    height: "auto",
    minWidth: "auto",
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

export default extendedTablesStyle;
