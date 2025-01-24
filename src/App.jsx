import { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, addTodos } from './features/todoSlice'

function App() {
  const [newTodo, setNewTodo] = useState("")
  const [isFetched, setIsFetched] = useState(false)
  const [showTodos, setShowTodos] = useState(false); // Tracks if todos should be displayed

  const dispatch = useDispatch()
  const todosList = useSelector((state) => state.todo.data)

  const { isLoading, data, isError } = useSelector((state) => state.todo)

  const handleTodo = () => {
    if (!isFetched) {
      dispatch(fetchTodos()); // Fetch todos only once
      setIsFetched(prevIsFetched => !prevIsFetched); // Mark as fetched
    }
    setShowTodos((prevShowTodos) => !prevShowTodos); // Toggle display
  };

  const addTodo = (e) => {
    e.preventDefault();  // Make sure to prevent the default form submission behavior
    if (newTodo.trim()) {
      const todoToAdd = { title: newTodo, completed: false, userId: 1 }; // Define the new todo object
      dispatch(addTodos(todoToAdd)); // Dispatch the action to add the todo
      setNewTodo(""); // Clear the input field
    }
  };

  return (
    <div className='p-8'>
      <h2>Redux ToolKit with API Integration</h2>
      <button className='cursor-pointer p-2 bg-green-200 rounded-md mt-4' onClick={handleTodo}>
        {showTodos ? "Hide Todos" : "Fetch Todos"}
      </button>

      {showTodos && todosList && todosList.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}

      {isLoading && <h2>Loading...</h2>}
      {isError && <h2>Error Occurred</h2>}
      
      <form onSubmit={addTodo} className='flex items-center justify-center mt-8 max-w-md'>
        <input
          className='w-1/2 border border-red-600 rounded px-2 py-1'
          type="text"
          placeholder='Add Todo'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="ml-4 py-1 px-4 rounded text-center bg-green-200">Add</button>
      </form>
    </div>
  );
}

export default App;
