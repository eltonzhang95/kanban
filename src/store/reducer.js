import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

export const kanbanSlice = createSlice({
        name: "kanban",
        initialState,
        reducers:{
            updateContent: (state, action) => {
                state.content = action.payload;
                console.log(state.content)
            },
            updateSeletedCol: (state, action) => {
                state.selectedColTitle = action.payload;
            }
        }
    }
);

export const { updateContent, updateSeletedCol } = kanbanSlice.actions;

export default kanbanSlice.reducer;