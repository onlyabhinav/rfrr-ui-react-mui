import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import { I_CUSTLIST_GET_ALL, I_NEW_ACCOUNT_OPEN } from "../constants/API_URLS";
import PopupMessage from "./PopupMessage";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AccountOpenForm() {
  const [campaignData, setCampaignData] = useState({
    campaignName: "",
    targetAudience: "",
    schedules: [{ startDate: "", endDate: "" }],
  });

  const [errorMode, setErrorMode] = useState(false);
  const [errorText, setErrorText] = useState("NO ERROR");
  const [errorTitle, setErrorTitle] = useState("Unable to proceed due to below error:");

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

    //   "http://localhost:8081/api/v1/custlist/getall"; // Replace with your API endpoint

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

  const handleClose = () => {
    setErrorMode(false);
    //setSnackBarState(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonPayload = {
      name: data.get("customerName"),
      email: data.get("customerEmail"),
      phone: data.get("customerPhone"),
      referralCode: data.get("referralCode"),
    };

    console.log(jsonPayload);
    console.log("==================================");
    console.log("JSON Payload: " + JSON.stringify(jsonPayload));

    const apiUrl = I_NEW_ACCOUNT_OPEN; // Replace with your API endpoint

    console.log("Endpoint: " + apiUrl);

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
        console.error("ERROR ON ACCOUNT OPEN", error);
        setErrorMode(true);
        setErrorText(error.response.data);

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
            New Account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <PopupMessage
              errorMode={errorMode}
              errorText={errorText}
              errorTitle={errorTitle}
              onPopupClose={handleClose}
            />

            <Grid container columnSpacing={2} rowSpacing={1}>
              <Grid item xs={8} sx={{ verticalAlign: "center" }}>
                <Typography component="label" variant="overline" fontWeight="bold">
                  Your Name
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="filled-hidden-label-small"
                  variant="outlined"
                  color="primary"
                  size="small"
                  name="customerName"
                />
              </Grid>{" "}
              <Grid item xs={4} sx={{ verticalAlign: "center" }}>
                <Typography component="label" variant="overline" fontWeight="bold">
                  Referral CODE
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="filled-hidden-label-small"
                  variant="outlined"
                  color="primary"
                  size="small"
                  name="referralCode"
                />
              </Grid>
              <Grid item xs={8} sx={{ verticalAlign: "center" }}>
                <Typography component="label" variant="overline" fontWeight="bold">
                  Email{" "}
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="filled-hidden-label-small"
                  variant="outlined"
                  color="primary"
                  size="small"
                  name="customerEmail"
                />
              </Grid>
              <Grid item xs={4} sx={{ verticalAlign: "center" }}>
                <Typography component="label" variant="overline" fontWeight="bold">
                  Phone Number
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="filled-hidden-label-small"
                  variant="outlined"
                  color="primary"
                  size="small"
                  name="customerPhone"
                />
              </Grid>{" "}
              <Grid item xs={12} sx={{ verticalAlign: "center", horizontalAlign: "right" }}>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
                  Proceed to Open Account
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
