import Todo from "../models/todo";

export interface TodosProps{
    items: Todo[];
    onRemoveTodo: (id: string) => void;
}

export interface onAddProps extends TodosProps {
    onAddTodo: (text: string) => void;
}

export interface ItemsProps {
    id: string,
    text: string,
    onRemoveTodo: (id: string) => void;
}