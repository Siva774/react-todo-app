import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push({ text: action.payload, completed: false });
        },
        removeTask: (state, action) => {
            return state.filter((task, index) => index !== action.payload);
        },
        toggleTaskCompletion: (state, action) => {
            const task = state[action.payload];
            if (task) {
                task.completed = !task.completed;
            }
        },
        editTask: (state, action) => {
            const { index, newText } = action.payload;
            const task = state[index];
            if (task) {
                task.text = newText;
            }
        },
        setTasks: (state, action) => {
            return action.payload;
        },
    },
});

export const { addTask, removeTask, toggleTaskCompletion, editTask, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;