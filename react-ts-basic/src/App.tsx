import { useRef } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoTemplate from './components/TodoTemplate';
import { useSelector } from 'react-redux';
import TodoListItem from './components/TodoListItem';

export interface Todos {
  id: number;
  text: string;
  checked: boolean;
}
interface RootState {
  items: Todos[];
}
const App = () => {
  const todos = useSelector((state: RootState) => state.items);
  return (
    <TodoTemplate>
      <TodoInsert />
      <div className="TodoList">
      {todos.map((todo: Todos) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </div>
    </TodoTemplate>
  );
};

export default App;
