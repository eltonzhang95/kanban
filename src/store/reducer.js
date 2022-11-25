import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

export const kanbanSlice = createSlice({
        name: "kanban",
        initialState,
        reducers:{
            updateContent: (state, action) => {
                state.content = action.payload;
            },
            updateSeletedCol: (state, action) => {
                state.selectedColTitle = action.payload;
            },
            updateSeletedTask: (state, action) => {
                state.selectedTaskName = action.payload;
            }
        }
    }
);

export const { updateContent, updateSeletedCol, updateSeletedTask } = kanbanSlice.actions;

export default kanbanSlice.reducer;