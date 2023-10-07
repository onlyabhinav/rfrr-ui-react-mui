import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import DenseTable from "../controls/DenseTable";
import DataGridDemo from "../controls/DataGridDemo";
import TheForm from "../controls/TheForm";
import TheForm2 from "../controls/TheForm2";
import SignUpForm from "../controls/SignUpForm";
import EventForm from "./EventForm";
import EventForm2 from "./EventForm2";

export default function CampaignCreate() {
  return (
    <Paper sx={{ margin: "auto", overflow: "hidden", borderRadius: 0 }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          backgroundColor: "#90caf9",
        }}
      >
        <Typography variant="h3" component="h3" align="center" padding={2}>
          Create Campaign
        </Typography>
      </AppBar>

      <EventForm2 />

      {/* <SignUpForm /> */}
      {/* <DenseTable /> */}
      {/* <DataGridDemo/> */}
      {/* <SignUp/> */}
    </Paper>
  );
}
