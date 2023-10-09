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
import { Box, Card, CardActions, CardContent } from "@mui/material";

export default function CampaignHome() {
  const bull = <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}></Box>;

  return (
    <Paper sx={{ maxWidth: 4000, margin: "auto", overflow: "hidden" }}>
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
          MGM HOME
        </Typography>
      </AppBar>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="h5" component="div">
            Abhinav
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Admin
          </Typography>
          <Typography variant="body2">Please go to respective pages to view the details</Typography>
        </CardContent>
        <CardActions>
          <Button size="small"></Button>
        </CardActions>
      </Card>

      {/* <DataGridDemo/> */}
    </Paper>
  );
}
