import { Box, Button, FormLabel, LinearProgress, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
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
import { I_CAMPAIGN_GET_ALL, I_LIVECAMPAIGN_GET_ALL } from "../constants/API_URLS";
import { TIMER_VALUE } from "../constants/GLOBAL_CONFIG";

export default function LiveCampaignsView() {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState([]);

  const [selectedKey, setSelectedKey] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(1);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  const navigate = useNavigate();

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = I_CAMPAIGN_GET_ALL;
    //"http://localhost:8081/api/v1/campaign/getlivecampaigns"; // Replace with your API endpoint

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
    "campaignCampaignName",
    //"campaignCode",
    "customerId",
    "customerName",
    "customerEmail",
    "customerPhone",
    "referrerCode",
    "qualifiedCount",
    "rewardCount",
  ];

  const handleMenuItemClick = (event: SelectChangeEvent) => {
    console.log(event.target.value);

    setSelectedKey(event.target.value);
  };

  const handleSubmitFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filterData = {
      selectedKey: selectedKey,
    };

    console.log("Filters --> " + filterData);

    // Define the API endpoint URL
    const apiUrl = I_LIVECAMPAIGN_GET_ALL + "/" + selectedKey;
    //"http://localhost:8081/api/v1/customer/getwithfilter"; // Replace with your API endpoint

    setLoading(true);
    setSuccess(false);

    console.info("Getting Data from API...");

    // Fetch data from the API
    axios
      .get(apiUrl)
      .then((response) => {
        console.info("Data received from API...");

        timer.current = window.setTimeout(() => {
          setSuccess(true);
          setLoading(false);
          setCampaignDetails(response.data);
        }, TIMER_VALUE);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

        timer.current = window.setTimeout(() => {
          setSuccess(true);
          setLoading(false);
        }, TIMER_VALUE);
      });
  };

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
          View LIVE Campaigns
        </Typography>
      </AppBar>

      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmitFilter}
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
            Select Campaign
          </Typography>
          <Select
            name="selectedCampaugn"
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            value={selectedKey}
            sx={{ width: 450 }}
            onChange={handleMenuItemClick}
          >
            {campaigns.map((item: any, index) => (
              <MenuItem key={item.id} value={item.id} selected={index === selectedIndex}>
                {"[" + item.id + "] - " + item.campaignName}
              </MenuItem>
            ))}
          </Select>

          <Box sx={{ m: 1, position: "relative" }}>
            <Button type="submit" variant="contained" disabled={loading} color="primary" size="large">
              Show Details
            </Button>
          </Box>
        </Box>
      </AppBar>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          visibility: campaignDetails.length > 0 ? "visible" : "hidden",
          "& > :not(style)": { m: 0 },
        }}
      >
        <TablePaged rows={campaignDetails} columns={columnsDef} key="customerid" />
      </Box>
    </Paper>
  );
}
