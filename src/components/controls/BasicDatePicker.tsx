import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { getTodayDate } from "@mui/x-date-pickers/internals";

export default function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker label="Start Date" minDate={getTodayDate} />
        <DatePicker label="End Date" />
        <Button
          size="small"
          variant="outlined"
          type="submit"
          color="secondary"
          sx={{ mt: 1, mb: 2 }}
        >
          Add
        </Button>
      </DemoContainer>
    </LocalizationProvider>
  );
}
