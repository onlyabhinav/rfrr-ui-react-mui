import {
  Box,
  Button,
  FormLabel,
  LinearProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AgeSlider from "../controls/AgeSlider";
import MultiSelectCountries2 from "../controls/MultiSelectCountries2";
import MultiSelectProfession from "../controls/MultiSelectProfession";
import TablePaged from "../controls/TablePaged";
import { useNavigate } from "react-router-dom";

export default function CampaignsView() {
  const [campaigns, setCampaigns] = useState([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  const navigate = useNavigate();

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = "http://localhost:8081/api/v1/campaign/getall"; // Replace with your API endpoint

    console.info("Getting Data from API...");

    setLoading(true);

    // Fetch data from the API
    axios
      .get(apiUrl)
      .then((response) => {
        console.info("Data received from API...");
        setCampaigns(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const columnsDef = [
    "id",
    "campaignName",
    "campaignCode",
    "active",
    "targetAudienceKey",
    "createdById",
    "revision",
    "targetLocation",
  ];

  return (
    <Paper sx={{ margin: "auto", overflow: "hidden", borderRadius: 0 }}>
      {loading && <LinearProgress sx={{ position: "sticky" }} />}

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
          View Campaigns
        </Typography>
      </AppBar>

      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Box
          component="form"
          noValidate
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            "& > :not(style)": { m: 1 },
          }}
        >
          <Typography variant="h6" component="h6" align="left" padding={1}>
            Find
          </Typography>
          <TextField
            id="listname"
            name="listname"
            select
            sx={{ width: 450 }}
            size="small"
            label="Select Campaign"
          >
            {campaigns.map((item: any) => (
              <MenuItem key={item.id} value={item.id}>
                {"[" + item.id + "] - " + item.campaignName}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              disabled={loading}
              color="primary"
              size="large"
            >
              Open Campaign
            </Button>
            <Button
              onClick={() => navigate("/createcampaign?id=30")}
              size="small"
            >
              Click here to create a new customer list
            </Button>
          </Box>
        </Box>
      </AppBar>
      <TablePaged rows={campaigns} columns={columnsDef} key="customerid" />
    </Paper>
  );
}
