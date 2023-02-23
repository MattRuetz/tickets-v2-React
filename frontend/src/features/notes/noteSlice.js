import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Slice Action - Get ticket notes
export const getNotes = createAsyncThunk(
    'notes/getAll',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await noteService.getNotes(ticketId, token);
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

// Create ticket notes
export const createNote = createAsyncThunk(
    'notes/create',
    async ({ noteText, ticketId }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await noteService.createNote(noteText, ticketId, token);
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

// Slice Action - Create new ticket
// export const createNote = createAsyncThunk(
//     'notes/create',
//     async (ticketData, thunkAPI) => {
//         try {
//             // The redux toolkit's ThunkAPI lets us pull another state into this slice
//             // So we can get the token, and send it along with the API request to createTicket (protected route)
//             const token = thunkAPI.getState().auth.user.token;
//             return await ticketService.createTicket(ticketData, token);
//         } catch (error) {
//             // Check ways error could be nested
//             const message =
//                 (error.response &&
//                     error.response.data &&
//                     error.response.data.message) ||
//                 error.message ||
//                 error.toString();

//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                // payload sent by createTicket::: thunkAPI.rejectWithValue(message);
                state.message = action.payload;
            })
            .addCase(createNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Push new note to the notes array
                state.notes.push(action.payload);
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                // payload sent by createTicket::: thunkAPI.rejectWithValue(message);
                state.message = action.payload;
            });
    },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
