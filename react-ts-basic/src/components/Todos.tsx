import React from 'react'
import Todo from '../models/todo'
import TodoItems from './TodoItems'
import classes from './Todos.module.css'

interface TodosProps {
  items: Todo[];
  onRemoveTodo: (id: string) => void;
}

const Todos = ({ items, onRemoveTodo }: TodosProps) => {
  return (
    <ul className={classes.todos}>
      {items.map(item =>
        <TodoItems
          id={item.id}
          text={item.text}
          onRemoveTodo={onRemoveTodo}
        />)}
    </ul>
  )
}

export default Todos