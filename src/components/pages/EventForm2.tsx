// EventForm.js
import React, { useState } from "react";

const EventForm2 = () => {
  const [eventData, setEventData] = useState({
    eventName: "",
    eventCategory: "",
    schedules: [{ date: "", time: "" }],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSchedules = [...eventData.schedules];
    updatedSchedules[index][name] = value;
    setEventData({ ...eventData, schedules: updatedSchedules });
  };

  const addSchedule = () => {
    setEventData({
      ...eventData,
      schedules: [...eventData.schedules, { date: "", time: "" }],
    });
  };

  const removeSchedule = (index) => {
    const updatedSchedules = [...eventData.schedules];
    updatedSchedules.splice(index, 1);
    setEventData({ ...eventData, schedules: updatedSchedules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send eventData to your API using a fetch or Axios
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      // Handle the API response as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Event Name:
        <input
          type="text"
          name="eventName"
          value={eventData.eventName}
          onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })}
        />
      </label>
      <label>
        Event Category:
        <input
          type="text"
          name="eventCategory"
          value={eventData.eventCategory}
          onChange={(e) => setEventData({ ...eventData, eventCategory: e.target.value })}
        />
      </label>
      {eventData.schedules.map((schedule, index) => (
        <div key={index}>
          <label>
            Schedule Date:
            <input type="date" name="date" value={schedule.date} onChange={(e) => handleChange(e, index)} />
          </label>
          <label>
            Schedule Time:
            <input type="time" name="time" value={schedule.time} onChange={(e) => handleChange(e, index)} />
          </label>
          <button type="button" onClick={() => removeSchedule(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addSchedule}>
        Add Schedule
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventForm2;
