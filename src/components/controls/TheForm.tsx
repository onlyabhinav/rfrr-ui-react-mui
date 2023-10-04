import { Box, Card, TextField } from "@mui/material";
import React, { useState } from "react";

function TheForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    salary: "",
    dateOfJoining: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the form data in the 'formData' state object
    console.log(formData);
    // Here, you can send the data to your server or perform any desired actions.
  };

  return (
    <Card>
      <h2>Employee Information Form</h2>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </Box>
    </Card>
  );
}

export default TheForm;
