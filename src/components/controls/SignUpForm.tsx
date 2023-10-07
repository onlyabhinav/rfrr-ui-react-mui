import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Select } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BasicDatePicker from "./BasicDatePicker";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUpForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h4" variant="h4">
            New Campaign Details
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 4 }}
          >
            <Grid container columnSpacing={2} rowSpacing={1}>
              <Grid item xs={12} sx={{ verticalAlign: "center" }}>
                <Typography component="label" variant="overline">
                  Campaign Name
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="filled-hidden-label-small"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sx={{ verticalAlign: "center" }}>
                <Typography component="label" variant="overline">
                  Campaign Name
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="filled-hidden-label-small"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sx={{ verticalAlign: "center" }}>
                <Typography component="label" variant="overline">
                  Target Customers:
                </Typography>
                <Select
                  fullWidth
                  id="filled-hidden-label-small"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sx={{ verticalAlign: "center" }}>
                <Typography component="label" variant="overline">
                  Schedules:
                </Typography>
                <BasicDatePicker />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
