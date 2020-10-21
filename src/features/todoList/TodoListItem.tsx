import React from 'react'

interface TodoProps {
    name: string,
    isCompleted: boolean,
    id: string
    onClick: () => any,
}

export default function TodoListItem({ isCompleted, name, onClick }: TodoProps) {
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
            <button>Remove</button>
        </div>
    )
}
