import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};

const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return response.json();
});

const addTodos = createAsyncThunk("addTodos", async (newTodo) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST", // HTTP POST method
    headers: {
      "Content-Type": "application/json", // Inform the server about the data type
    },
    body: JSON.stringify(newTodo), // Convert newTodo object to a JSON string
  });
  return response.json();
});

const todoSlice = createSlice({
  name: "Todo",
  initialState,
  extraReducers: (builder) => {
    // Pending state: API call started
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    // Fulfilled state: API call succeeded
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    // Rejected state: API call failed
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Add Todo
    builder.addCase(addTodos.fulfilled, (state, action) => {
      state.data.push(action.payload); // Add the new todo to the data array
    });
    builder.addCase(addTodos.rejected, (state) => {
      state.isError = true;
    });
  },
});

export { fetchTodos, addTodos };
export default todoSlice.reducer;
