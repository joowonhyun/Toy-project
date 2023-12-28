import { useCallback, useRef, useState } from 'react';
import TodoInsert from './Components/TodoInsert';
import TodoList from './Components/TodoList';
import TodoTemplate from './Components/TodoTemplate';

export interface Todos {
  id: number;
  text: string;
  checked: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todos[]>([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);
  const nextId = useRef(4);
  const onInsert = useCallback((text: string) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => [...todos, todo]);
    nextId.current += 1;
  }, []);
  const onRemove = useCallback(
    (id: number) => {
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );
  const onToggle = useCallback(
    (id: number) => {
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
