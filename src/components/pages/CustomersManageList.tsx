import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import TablePaged from "../controls/TablePaged";
import FormEx from "../controls/FormEx";
import { Box, Button, FormLabel, TextField } from "@mui/material";
import MultiSelectChip from "../controls/MultiSelectCountries";
import MultiSelectCountries from "../controls/MultiSelectCountries";
import MultiSelectProfession from "../controls/MultiSelectProfession";
import AgeSlider from "../controls/AgeSlider";
import MultiSelectCountries2 from "../controls/MultiSelectCountries2";
import FormControl from "@mui/material/FormControl";

export default function CustomersManageList() {
  const [customers, setCustomers] = useState([]);

  const [ageRange, setAgeRange] = useState([]);
  const [countries, setCountries] = useState([]);
  const [professions, setProfessions] = useState([]);

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

  const handleSubmitSaveFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const listname = data.get("listname");
    const filterData = {
      ageRange: ageRange,
      countries: countries,
      professions: professions,
      name: listname,
    };

    console.log(filterData);

    // Define the API endpoint URL
    const apiUrl = "http://localhost:8081/api/v1/custlist/add"; // Replace with your API endpoint

    console.info("Saving Filter --> " + listname);

    // Fetch data from the API
    axios
      .post(apiUrl, filterData)
      .then((response) => {
        console.info("Filter Saved...");
        //setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error while saving filter:", error);
      });
  };

  const handleSubmitFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filterData = {
      ageRange: ageRange,
      countries: countries,
      professions: professions,
    };

    console.log("Filters --> " + filterData);

    // Define the API endpoint URL
    const apiUrl = "http://localhost:8081/api/v1/customer/getwithfilter"; // Replace with your API endpoint

    console.info("Getting Data from API...");

    // Fetch data from the API
    axios
      .post(apiUrl, filterData)
      .then((response) => {
        console.info("Data received from API...");
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleProfessionSelect = (professions: any) => {
    const professionValue = professions;
    console.log("Selected Profession --> " + professionValue);
    setProfessions(professionValue);
  };

  const handleCountriesSelect = (countries: any) => {
    const countriesValue = countries;
    console.log("Selected Countries --> " + countriesValue);
    setCountries(countriesValue);
  };

  const handleAgeSelect = (ageRange: any) => {
    const ageRangeValue = ageRange;
    console.log("Selected ageRangeValue --> " + ageRangeValue);
    setAgeRange(ageRangeValue);
  };

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
          Manage Customer List
        </Typography>
      </AppBar>

      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
        <Paper elevation={3} sx={{ backgroundColor: "#b2dfdb", borderRadius: 0 }}>
          <Typography variant="h6" component="h6" align="center" padding={1}>
            Create a list by applying filters
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitFilter}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& > :not(style)": { m: 1 },
            }}
          >
            <MultiSelectProfession onProfessionSelect={handleProfessionSelect} />
            {/* <TextField id="demo-helper-text-aligned" label="Profession" />
            <TextField id="demo-helper-text-aligned-no-helper" label="Name" /> */}
            <MultiSelectCountries2 onItemSelect={handleCountriesSelect} />
            <FormLabel component="h3">
              Age: <AgeSlider onItemSelect={handleAgeSelect} />
            </FormLabel>

            <Button type="submit" variant="contained" size="small" color="error">
              Apply
            </Button>
          </Box>
        </Paper>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmitSaveFilter}
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
            Save filter as a list
          </Typography>
          <TextField
            id="listname"
            name="listname"
            sx={{ width: 450 }}
            size="large"
            label="List Name"
            helperText="business friendly name. eg: '2023 Oct Winter Student Campaign Audience'"
          />
          <Button type="submit" variant="contained" color="primary" size="large" sx={{ width: 200 }}>
            Save List
          </Button>
        </Box>
      </AppBar>
      <TablePaged rows={customers} columns={columnsDef} key="customerid" />
    </Paper>
  );
}
