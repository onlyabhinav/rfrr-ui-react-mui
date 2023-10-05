import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import TablePaged from "../controls/TablePaged";
import FormEx from "../controls/FormEx";
import { Box, FormLabel, TextField } from "@mui/material";
import MultiSelectChip from "../controls/MultiSelectCountries";
import MultiSelectCountries from "../controls/MultiSelectCountries";
import MultiSelectProfession from "../controls/MultiSelectProfession";
import AgeSlider from "../controls/AgeSlider";

export default function CustomersManageList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = "http://localhost:8081/api/v1/customer/getall"; // Replace with your API endpoint

    console.info("Getting Data from API...");

    // Fetch data from the API
    axios
      .get(apiUrl)
      .then((response) => {
        console.info("Data received from API...");
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const columnsDef = [
    //   "id",
    "customerid",
    "surname",
    "email",
    "profession",
    "phone",
    //   "creditscore",
    "geography",
    //  "gender",
    "age",
    //  "tenure",
    "balance",
    //  "numofproducts",
    //  "hascrcard",
    //  "isactivemember",
    //  "estimatedsalary",
  ];

  return (
    <Paper sx={{ margin: "auto", overflow: "hidden", borderRadius: 0 }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)", backgroundColor: "#90caf9" }}
      >
        <Typography variant="h3" component="h3" align="center" padding={2}>
          Manage Customer List
        </Typography>
      </AppBar>

      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
        <Paper elevation={3} sx={{ backgroundColor: "#b2dfdb", borderRadius: 0 }}>
          <Typography variant="h6" component="h6" align="left" padding={1}>
            Create a list by applying filters
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "& > :not(style)": { m: 1 },
            }}
          >
            <MultiSelectProfession />
            {/* <TextField id="demo-helper-text-aligned" label="Profession" />
            <TextField id="demo-helper-text-aligned-no-helper" label="Name" /> */}
            <MultiSelectCountries />
            <FormLabel component="h3">
              Age: <AgeSlider />
            </FormLabel>
          </Box>
          <TablePaged rows={customers} columns={columnsDef} key="customerid" />
        </Paper>
      </AppBar>
    </Paper>
  );
}
