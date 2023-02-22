import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Slice Action - Create new ticket
export const createTicket = createAsyncThunk(
    'tickets/create',
    async (ticketData, thunkAPI) => {
        try {
            // The redux toolkit's ThunkAPI lets us pull another state into this slice
            // So we can get the token, and send it along with the API request to createTicket (protected route)
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.createTicket(ticketData, token);
        } catch (error) {
            // Check ways error could be nested
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                // payload sent by createTicket::: thunkAPI.rejectWithValue(message);
                state.message = action.payload;
            });
    },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
