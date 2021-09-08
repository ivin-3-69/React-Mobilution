/*eslint-disable*/

import Dashboard from "views/Dashboard/Dashboard.js";

import Client from "views/Clients/Clients.js";
import Consultant from "views/Consultants/consultants.js";
import BillableMonth from "views/BillableMonth/BillableMonth.js";
import Timesheet from "views/Timesheet/timesheetlist";
// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/client",
    name: "Client",
    icon: DashboardIcon,
    component: Client,
    layout: "/admin",
  },
  {
    path: "/consultant",
    name: "Consultant",
    icon: DashboardIcon,
    component: Consultant,
    layout: "/admin",
  },
  {
    path: "/billmonth",
    name: "Billable Month",
    icon: DashboardIcon,
    component: BillableMonth,
    layout: "/admin",
  },
  {
    path: "/timesheet",
    name: "Timesheet",
    icon: DashboardIcon,
    component: Timesheet,
    layout: "/admin",
  },
];
export default dashRoutes;
