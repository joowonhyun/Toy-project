import './TodoList.scss';
import TodoListItem from './TodoListItem';
import { Todos } from '../App';
import React from 'react';

interface TodoListProps {
  todos: Todos[];
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}
const TodoList = ({ todos, onRemove, onToggle }: TodoListProps) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default React.memo(TodoList);
