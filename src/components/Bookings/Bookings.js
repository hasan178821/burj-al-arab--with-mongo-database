import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect( () => {
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    }, [])
    return (
        <div>
            <h1>You have: {bookings.length} Bookings</h1>
            {
                bookings.map(book => <h4>{book.name} From: ({(new Date(book.CheckIn).toDateString('dd/MM/yyyy'))}) To: ({(new Date(book.CheckOut).toDateString('dd/MM/yyyy'))}) key={book._id}</h4>)
            }
        </div>
    );
};

export default Bookings;