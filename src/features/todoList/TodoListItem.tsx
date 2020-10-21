import React from 'react'
import { deleteTodo } from 'api/localhost';

interface TodoProps {
    name: string,
    isCompleted: boolean,
    id: string,
    onClick: () => any
}

function removeTodoHandler(id: string) {
    deleteTodo(id);
}

export default function TodoListItem({ isCompleted, name, onClick, id }: TodoProps) {
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
