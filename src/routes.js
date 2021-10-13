/*eslint-disable*/

import Dashboard from "views/Dashboard/Dashboard.js";

import Client from "views/Clients/Clients.js";
import Consultant from "views/Consultants/consultants.js";
import BillableMonth from "views/BillableMonth/BillableMonth.js";
import Timesheet from "views/Timesheet/timesheetlist";
import Invoice from "views/Invoice/invoice";
// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Business from "@material-ui/icons/Business";
import Person from "@material-ui/icons/Person";
import Receipt from "@material-ui/icons/Receipt";
import DateRange from "@material-ui/icons/DateRange";
import AccountBalance from "@material-ui/icons/AccountBalance";

var dashRoutes = [
  {
    path: "/client",
    name: "Client",
    icon: Business,
    component: Client,
    layout: "/admin",
  },
  {
    path: "/consultant",
    name: "Consultant",
    icon: Person,
    component: Consultant,
    layout: "/admin",
  },
  {
    path: "/billmonth",
    name: "Billable Month",
    icon: Receipt,
    component: BillableMonth,
    layout: "/admin",
  },
  {
    path: "/timesheet",
    name: "Timesheet",
    icon: DateRange,
    component: Timesheet,
    layout: "/admin",
  },
  {
    path: "/invoice",
    name: "Invoice",
    icon: AccountBalance,
    component: Invoice,
    layout: "/admin",
  },
];
export default dashRoutes;
