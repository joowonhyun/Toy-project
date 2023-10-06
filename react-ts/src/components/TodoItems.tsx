import classes from './TodoItem.module.css'

interface ItemsProps {
    id: string,
    text: string,
    onRemoveTodo: (id: string) => void;
}


const TodoItems = ({ id, text, onRemoveTodo}: ItemsProps) => {
    return (
        <div>
            <li className={classes.item}>{text}</li>
            <button onClick={() => {onRemoveTodo(id)}}>삭제</button>
        </div>
    )
}

export default TodoItems