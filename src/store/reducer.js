import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

export const kanbanSlice = createSlice({
        name: "kanban",
        initialState,
        reducers:{
            updateContent: (state, action) => {
                state.content = action.payload;
            }
        }
    }
);

export const { updateContent } = kanbanSlice.actions;

export default kanbanSlice.reducer;