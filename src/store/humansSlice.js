import { createSlice, nanoid } from '@reduxjs/toolkit';
import { tasksSlice } from './tasksSlice';

const createHuman = (name) => {
  return {
    id: nanoid(),
    name,
    taskIds: []
  };
};

const initialState = [createHuman('Ali'), createHuman('Noor')];

export const humansSlice = createSlice({
  name: 'humans',
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(createHuman(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(tasksSlice.actions.assignToUser, (state, action) => {
      // console.log(action.payload);
      for (const human of state) {
        if (human.id === action.payload.humanId) {
          human.taskIds.push(action.payload.taskId);
        } else {
          human.taskIds = human.taskIds.filter(
            (taskId) => taskId !== action.payload.taskId
          );
        }
      }
    });
  }
});
