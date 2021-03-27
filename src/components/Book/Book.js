import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import Bookings from "../Bookings/Bookings";

const Book = () => {
  const { bedType } = useParams();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [selectedDate, setSelectedDate] = React.useState({
    CheckIn: new Date(),
    CheckOut: new Date()
  }
  );

  const handleCheckInDate = (date) => {
      const newDate = {...selectedDate};
      newDate.CheckIn = date;
    setSelectedDate(newDate);
  };

  const handleCheckOutDate = (date) => {
      const newDate = {...selectedDate};
      newDate.CheckOut = date;
    setSelectedDate(newDate);
  }

  const handleButton = () => {
      const newBooking = {...loggedInUser, ...selectedDate}
      fetch('http://localhost:5000/addBooking', {
        method: 'POST',
        headers: {'Content-Type': 'Application/json'},
        body: JSON.stringify(newBooking)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      });
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        Hi <span style={{ color: "cyan" }}>{loggedInUser.name}!</span> Let's
        book a {bedType} Room.
      </h1>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Check In"
            value={selectedDate.CheckIn}
            onChange={handleCheckInDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Check Out"
            format="dd/MM/yyyy"
            value={selectedDate.CheckOut}
            onChange={handleCheckOutDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Button onClick={handleButton} variant="contained" color="secondary">
          Secondary
        </Button>
      </MuiPickersUtilsProvider>
      <Bookings></Bookings>
    </div>
  );
};

export default Book;
