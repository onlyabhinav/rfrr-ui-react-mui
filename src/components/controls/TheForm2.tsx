import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function TheForm2() {
  return (
    <Box
      component="form"
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
      }}
    >
      <Grid container spacing={20}>
        <Grid item xs={6}>
          <TextField fullWidth={true} id="outlined-basic" label="Outlined" variant="filled" />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth={true} id="outlined-basic" label="Outlined" variant="outlined" />
        </Grid>
      </Grid>
    </Box>
  );
}
