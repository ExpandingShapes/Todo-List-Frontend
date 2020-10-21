import { writeTodo } from 'api/localhost';
import React from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from './todoSlice';

export default function AddTodo(): JSX.Element {
    const dispatch = useDispatch();
    const [name, setName] = React.useState('');

    function handleChange(e: { target: HTMLInputElement; }) {
        setName(e.target.value);
    }

    function handleSubmit(e: any) {
        e.preventDefault()

        if (!name.trim()) {
            return
        }
        writeTodo(name);
        dispatch(addTodo(name))

        setName('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={handleChange} />
            <button type="submit">Add Todo</button>
        </form>
    )
}
