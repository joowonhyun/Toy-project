import { useRef } from 'react'
import classes from './NewTodo.module.css'

interface onAddProps {
  onAddTodo: (text: string) => void;
}

const NewTodo = ({ onAddTodo }: onAddProps) => {
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const currentRef = todoTextInputRef.current;
    if (currentRef && currentRef.value.trim().length > 0) {
      const enteredText = currentRef.value;
      onAddTodo(enteredText);
      currentRef.focus();
      currentRef.value = '';
    }
  }
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor='text'><h1>할 일 목록</h1></label>
      <input type="text" id='text' ref={todoTextInputRef} />
      <button>추가</button>
    </form>
  )
}

export default NewTodo