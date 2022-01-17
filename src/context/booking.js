import React, { useReducer, createContext } from "react";

export const BookingContext = createContext();

const initialState = {
    bookings: [
    ],
    currentBooking: null,
    loading: false,
    error: null,
    mapsKey: "AIzaSyB5xEVK86_GHlYJRFz9G3WgsiIwPFWSw8Y",
    address: null,
    key: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_BOOKING":
            return {
                bookings: [...state.bookings, action.payload]
            };
        case "ADD_CURRENT_BOOKING":
            return {
                currentBooking: action.payload
            };
        case "ADD_ADDRESS":
            return {
                address: action.payload
            };
        case "ADD_KEY":
            return {
                key: action.payload
            };
        case "DEL_BOOKING":
            return {
                bookings: state.bookings.filter(
                    contact => contact.id !== action.payload
                )
            };
        case "START":
            return {
                loading: true
            };
        case "COMPLETE":
            return {
                loading: false
            };
        default:
            throw new Error();
    }
};

export const BookingContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <BookingContext.Provider value={[state, dispatch]}>
            {props.children}
        </BookingContext.Provider>
    );
};