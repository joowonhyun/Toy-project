import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAdd } from '../store/store';

const TodoInsert = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  }
  
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(onAdd(value));
    setValue('');
  };
  return (
    <form className="TodoInsert" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={handleChange}
      />
      <button>
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
