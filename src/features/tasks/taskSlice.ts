import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {CreateTaskRequest, CreateTaskResponse, initialState, Task, TaskDetails} from "@/types/task";


// Fetch all tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get<{ data: Task[]; message: string }>(
        'http://frontendtest.ideallco.com/api/todos/fetch/all'
    );
    return response.data.data;
});


// Create a new task
export const createTask = createAsyncThunk<CreateTaskResponse, Task>(
    'tasks/createTask',
    async (task: CreateTaskRequest, { rejectWithValue }) => {
      try {
        const response = await axios.post<CreateTaskResponse>('http://frontendtest.ideallco.com/api/todos/create', task);
        return response.data;
      } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
              return rejectWithValue(error.response?.data);
          } else {
              return rejectWithValue({ message: 'An unexpected error occurred' });
          }
      }
    }
);

// Update task completion status
export const updateTaskCompletion = createAsyncThunk(
    'tasks/updateTaskCompletion',
    async ({ id, isCompleted }: { id: string; isCompleted: boolean }) => {
      const response = await axios.put<Task>(`http://frontendtest.ideallco.com/api/todos/update/${id}`, {
        is_completed: isCompleted,
      });
      return response.data;
    }
);

// Delete a task
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id: string, { rejectWithValue }) => {
        try {
            await axios.delete(`http://frontendtest.ideallco.com/api/todos/delete/${id}`);
            return id;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue({ message: 'An unexpected error occurred' });
            }
        }
    }
);

// show a task
export const showTask = createAsyncThunk(
    'tasks/showTask',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get<TaskDetails>(`http://frontendtest.ideallco.com/api/todos/get/${id}`);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue({ message: 'An unexpected error occurred' });
            }
        }
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearSelectedTask: (state) => {
            state.selectedTask = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch tasks
            .addCase(fetchTasks.pending, (state) => {
                state.fetchTasksLoading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.fetchTasksLoading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.fetchTasksLoading = false;
                state.error = action.error.message || 'Failed to fetch tasks';
            })

            // Create task
            .addCase(createTask.pending, (state) => {
                state.fetchTasksLoading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.fetchTasksLoading = false;
                state.tasks.push(action.payload.data);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.fetchTasksLoading = false;
                state.error = action.payload as string;
            })

            // Update task completion
            .addCase(updateTaskCompletion.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                state.tasks = state.tasks.map((task) =>
                    task._id === updatedTask._id ? updatedTask : task
                );
            })

            // Delete task
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task._id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // Show task
            .addCase(showTask.pending, (state) => {
                state.showTaskLoading = true;
                state.error = null;
            })
            .addCase(showTask.fulfilled, (state, action) => {
                state.showTaskLoading = false;
                state.selectedTask = action.payload;
            })
            .addCase(showTask.rejected, (state, action) => {
            state.showTaskLoading = false;
            state.error = action.payload as string
            });
    },
});

export const { clearSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;