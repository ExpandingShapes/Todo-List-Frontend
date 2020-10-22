import React from 'react'
import TodoListItem from './TodoListItem'
import { RootState } from 'app/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, toggleAllTodos } from './todoSlice';
import { VisibilityFilter } from 'features/visibilityFilter/visibilityFilterSlice';
import { Todo } from './types';
import { deleteCompletedTodos } from 'api/localhost';

const getVisibleTodos = (todos: Todo[], filter: VisibilityFilter) => {
    switch (filter) {
        case VisibilityFilter.ShowAll:
            return todos
        case VisibilityFilter.ShowCompleted:
            return todos.filter(t => t.isCompleted)
        case VisibilityFilter.ShowActive:
            return todos.filter(t => !t.isCompleted)
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}

export default function TodoList(): JSX.Element {
    const dispatch = useDispatch();

    const todos = useSelector(
        (state: RootState) => getVisibleTodos(state.todos, state.visibilityFilter)
    );

    function toggleAllHandler() {
        dispatch(toggleAllTodos());
    }

    function removeAllCompletedTodosHandler() {
        deleteCompletedTodos();
    }

    return (
        <div>
            <button onClick={() => {removeAllCompletedTodosHandler()}}>
                Remove All Completed
            </button>
            <button onClick={() => {toggleAllHandler()}}>
                Complete All
            </button>
            <ul>
                {todos.map(todo => (
                    <TodoListItem key={todo.id} id={todo.id} {...todo} onClick={() => dispatch(toggleTodo(todo))} />

                ))}
            </ul>
        </div>
    );
}
