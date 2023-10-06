import { useState } from 'react';
import './App.css';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);
    setTodos((prevState => [...prevState, newTodo]));
  }

  const removeTodoHandler= (todoId: string) => {
    setTodos(prevState => prevState.filter(item => item.id !== todoId))
  }

  return (
    <div>
      <NewTodo onAddTodo={addTodoHandler}/>
      <Todos onRemoveTodo={removeTodoHandler} items={todos}/>
    </div>
  )
}

export default App