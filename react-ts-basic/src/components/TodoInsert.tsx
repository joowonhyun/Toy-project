import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';
import { SetStateAction, useCallback, useState } from 'react';

interface propInsertFunc {
  onInsert: (e: string) => void;
}

const TodoInsert = ({ onInsert }: propInsertFunc) => {
  const [value, setValue] = useState('');
  const handleChange = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setValue(e.target.value);
    },
    [],
  );
  const handleSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      onInsert(value);
      setValue('');
      e.preventDefault();
    },
    [onInsert, value],
  );
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
