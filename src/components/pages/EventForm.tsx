// src/components/EventForm.js
import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, createTheme } from "@mui/material";
import React, { useState } from "react";

const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [schedules, setSchedules] = useState([]);

  const handleAddSchedule = () => {
    // Add a new schedule to the schedules array
    setSchedules([...schedules, ""]);
  };

  const defaultTheme = createTheme();

  const handleScheduleChange = (index, value) => {
    // Update a specific schedule in the schedules array
    const updatedSchedules = [...schedules];
    updatedSchedules[index] = value;
    setSchedules(updatedSchedules);
  };

  const handleSubmit = () => {
    // Send the data to your API
    const eventData = {
      name: eventName,
      category: eventCategory,
      schedules: schedules,
    };

    // Make an API request to send eventData
    // You can use Axios, Fetch, or any other library for this.
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div>
          <h2>Create Event</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Event Name:
              <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
            </label>
            <br />
            <label>
              Event Category:
              <select value={eventCategory} onChange={(e) => setEventCategory(e.target.value)}>
                <option value="conference">Conference</option>
                <option value="seminar">Seminar</option>
                <option value="workshop">Workshop</option>
              </select>
            </label>
            <br />
            <button type="button" onClick={handleAddSchedule}>
              Add Schedule
            </button>
            <br />
            {schedules.map((schedule, index) => (
              <input
                type="text"
                key={index}
                value={schedule}
                onChange={(e) => handleScheduleChange(index, e.target.value)}
              />
            ))}
            <br />
            <button type="submit">Create Event</button>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default EventForm;
