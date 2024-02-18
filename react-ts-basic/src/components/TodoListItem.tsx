import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';

import './TodoListItem.scss';
import { Todos } from '../App';
import { onRemove, onToggle } from '../store/store';
import { useDispatch } from 'react-redux';

interface listProps {
  todo: Todos;
}

const TodoListItem = ({ todo }: listProps) => {
  const { id, text, checked } = todo;
  const dispatch = useDispatch();
  return (
    <div className="TodoListItem">
      <div
        className={cn('checkbox', { checked })}
        onClick={() => {
          dispatch(onToggle(id));
        }}
      >
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div
        className="remove"
        onClick={() => {
          dispatch(onRemove(id));
        }}
      >
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
