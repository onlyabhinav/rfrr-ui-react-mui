import { FormHelperText, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { countryListAllIsoData } from "../constants/countriesDemo";
import { I_CAMPAIGN_ADD, I_CUSTLIST_GET_ALL } from "../constants/API_URLS";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CreateCampaignForm() {
  const [campaignData, setCampaignData] = useState({
    campaignName: "",
    targetAudience: "",
    schedules: [{ startDate: "", endDate: "" }],
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const [custListData, setCustListData] = useState([
    {
      id: -1,
      name: "",
      queryString: "",
      createdDate: "",
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    const cId = path.split("?")[1];
    console.log(searchParams);

    const campaignId = searchParams.get("id");

    // Define the API endpoint URL
    const apiUrl = I_CUSTLIST_GET_ALL;

    //"http://localhost:8081/api/v1/custlist/getall"; // Replace with your API endpoint

    console.info("Getting Data from API...");

    //setLoading(true);

    // Fetch data from the API
    axios
      .get(apiUrl)
      .then((response) => {
        console.info("Data received from API...");
        setCustListData(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        //setLoading(false);
      });
  }, []);

  const addSchedule = () => {
    setCampaignData({
      ...campaignData,
      schedules: [...campaignData.schedules, { startDate: "", endDate: "" }],
    });
  };

  const removeSchedule = (index) => {
    const updatedSchedules = [...campaignData.schedules];
    updatedSchedules.splice(index, 1);
    setCampaignData({ ...campaignData, schedules: updatedSchedules });
  };

  const handleChange = (e, index) => {
    console.log(e);

    const { name, value } = e.target;
    const updatedSchedules = [...campaignData.schedules];
    updatedSchedules[index][name] = value;
    //console.log(updatedSchedules);
    setCampaignData({ ...campaignData, schedules: updatedSchedules });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonPayload = {
      campaignName: data.get("campaignName"),
      targetCustomerList: data.get("targetCustomerList"),
      targetLocation: data.get("targetLocation"),
      campaignCode: data.get("campaignCode"),
      maxReferralLimit: data.get("maxReferralLimit"),
      schedules: campaignData.schedules,
    };

    console.log(jsonPayload);
    console.log("==================================");
    console.log("JSON Payload: " + JSON.stringify(jsonPayload));

    const apiUrl = I_CAMPAIGN_ADD;
    //"http://localhost:8081/api/v1/campaign/add"; // Replace with your API endpoint

    console.info("Saving Campaign --> " + jsonPayload.campaignName);
    // setLoading(true);
    // setSuccess(false);

    // Fetch data from the API
    axios
      .post(apiUrl, jsonPayload)
      .then((response) => {
        console.info("Filter Saved...");
        //setCustomers(response.data);
        // timer.current = window.setTimeout(() => {
        //   setSuccess(true);
        //   setLoading(false);
        // }, 2000);
      })
      .catch((error) => {
        console.error("Error while saving filter:", error);
        // timer.current = window.setTimeout(() => {
        //   setSuccess(true);
        //   setLoading(false);
        // }, 2000);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}

          <Typography component="h4" variant="h4" color="primary">
            New Campaign Details
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container columnSpacing={2} rowSpacing={1}>
              <Grid item xs={8} sx={{ verticalAlign: "center" }}>
                <Typography component="label" variant="overline" fontWeight="bold">
                  Campaign Name
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="filled-hidden-label-small"
                  variant="outlined"
                  color="primary"
                  size="small"
                  name="campaignName"
                  helperText="Enter a name for your campaign"
                />
              </Grid>{" "}
              <Grid item xs={4} sx={{ verticalAlign: "center" }}>
                <Typography component="label" variant="overline" fontWeight="bold">
                  Campaign CODE
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="filled-hidden-label-small"
                  variant="outlined"
                  color="primary"
                  size="small"
                  name="campaignCode"
                  helperText="OPTIONAL: Code name for your campaign. Will be appended to referral code for easy identification. Eg 2023WINSTU"
                >
                  2023WINSTU
                </TextField>
              </Grid>
              <Grid item xs={8} sx={{ verticalAlign: "center" }}>
                <Typography component="label" variant="overline" fontWeight="bold">
                  Target Customer List:
                </Typography>
                <Select
                  fullWidth
                  name="targetCustomerList"
                  id="filled-hidden-label-small"
                  variant="outlined"
                  size="small"
                >
                  {custListData.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <Typography component="h1" variant="overline">
                        {"[" + item.id + "] " + item.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText color="error">
                  Note: Please create customer list first. Available Customer lists will be shown here.
                </FormHelperText>
                <Button onClick={() => navigate("/mngcustlist")} size="small">
                  Click here to create a new customer list
                </Button>
              </Grid>
              {/* Target Location */}
              <Grid item xs={4} sx={{ verticalAlign: "center" }}>
                <Typography component="label" variant="overline" fontWeight="bold">
                  Target Location:
                </Typography>
                <Select fullWidth name="targetLocation" id="filled-hidden-label-small" variant="outlined" size="small">
                  {countryListAllIsoData.map((item) => (
                    <MenuItem key={item.code3} value={item.code3}>
                      <Typography component="h1" variant="overline">
                        {"[" + item.code3 + "] " + item.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText color="error">
                  Note: Actual location will be determined by the target customer list. This is just for reference.
                </FormHelperText>
              </Grid>
              <Grid item xs={6} sx={{ verticalAlign: "center" }}>
                <Typography component="label" variant="overline" fontWeight="bold">
                  Max Referrals per Customer:
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="filled-hidden-label-small"
                  variant="outlined"
                  color="primary"
                  size="small"
                  name="maxReferralLimit"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  helperText="Maximun number of referrals allowed per customer"
                >
                  2
                </TextField>
              </Grid>
              {/* Schedule Start */}
              <Grid item xs={12} sx={{ verticalAlign: "center" }}>
                <Typography component="h1" variant="overline" fontWeight="bold">
                  Schedules:
                </Typography>

                {campaignData.schedules.map((schedule, index) => (
                  <Box
                    padding={2}
                    key={index}
                    sx={{
                      backgroundColor: "#ddeeff",
                      alignContent: "center",
                      marginBottom: 1,
                      marginLeft: 1,
                      padding: 1,
                      borderRadius: 4,
                    }}
                  >
                    {/* <div key={index}> */}
                    <Typography component="header" variant="button" color="primary" fontWeight="bold">
                      Schedule {index + 1}
                    </Typography>
                    <Typography
                      component="label"
                      variant="button"
                      padding={2}
                      sx={{
                        mt: 2,
                        mb: 2,
                        mr: 2,
                        alignContent: "center",
                      }}
                    >
                      Start Date:
                      <input
                        size={100}
                        type="date"
                        name="startDate"
                        value={schedule.startDate}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Typography>

                    <Typography
                      component="label"
                      variant="button"
                      sx={{
                        mt: 2,
                        mb: 2,
                        mr: 1,
                        alignContent: "center",
                        marginLeft: 2,
                      }}
                    >
                      End Date:
                      <input
                        type="date"
                        name="endDate"
                        value={schedule.endDate}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Typography>

                    <Chip
                      variant="outlined"
                      color="error"
                      size="small"
                      label="Remove"
                      sx={{
                        mt: 2,
                        mb: 2,
                        alignContent: "center",
                        marginLeft: 2,
                      }}
                      onClick={() => removeSchedule(index)}
                    />
                    {/* </div> */}
                  </Box>
                ))}
                {/* <BasicDatePicker /> */}

                <Button
                  size="small"
                  sx={{
                    mt: 2,
                    mb: 2,
                    alignContent: "center",
                    fontWeight: "bold",
                  }}
                  onClick={addSchedule}
                >
                  Add schedule
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ verticalAlign: "center", horizontalAlign: "right" }}>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
