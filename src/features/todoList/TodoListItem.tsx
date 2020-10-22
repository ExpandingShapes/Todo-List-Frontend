import React from 'react'
//import { deleteTodo } from 'api/localhost';
import { removeTodo } from './todoSlice';
import { useSelector, useDispatch } from 'react-redux';

interface TodoProps {
    name: string,
    isCompleted: boolean,
    id: string,
    onClick: () => any
}

export default function TodoListItem({ isCompleted, name, onClick, id }: TodoProps) {
    const dispatch = useDispatch();

    function removeTodoHandler(id: string) {
        dispatch(removeTodo(id));
    }

    return (
        <div>
            <li
                onClick={onClick}
                style={{
                    textDecoration: isCompleted ? 'line-through' : 'none'
                }}
            >
                {name}
            </li>
            <button onClick={() => {removeTodoHandler(id)}}>
                Remove
            </button>
        </div>
    )
}
