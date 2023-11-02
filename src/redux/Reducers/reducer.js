import { createReducer } from "@reduxjs/toolkit";

export const DataReducer = createReducer({}, {
    DATA_REQUEST : (state) => {
        state.allTickets = [];
        state.allUser = [];    },
    DATA_SUCCESS : (state, action) => {
        state.allTickets = action.payload.tickets;
        state.allUser = action.payload.users;
    },
    DATA_FAILURE : (state) => {
        state.allTickets = []
        state.allUser = [];
    },
});

export const SelectDataReducer = createReducer({}, {
    SELECT_DATA_REQUEST : (state) => {
        state.selectedData = [];
    },
    SELECT_DATA_SUCCESS : (state, action) => {
        state.selectedData = action.payload.selectedData;
        state.user = action.payload.user
        state.importance = action.payload.importance
    },
    SELECT_DATA_FAILURE : (state, action) => {
        state.selectedData = []
        state.message = action.payload.message
    },
});