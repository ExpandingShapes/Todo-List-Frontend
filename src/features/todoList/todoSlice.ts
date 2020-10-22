import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from 'app/store'
import { RootState } from 'app/rootReducer';
import { toggleAllTodosPatch, toggleTodoPatch, writeTodo, readTodos as fetchTodos } from 'api/localhost';
import { Todo } from 'features/todoList/types';

const initialState: Todo[] = [];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        receiveTodos(state, action: PayloadAction<Todo[]>) {
            return action.payload;
        },
        receiveTodo(state, action: PayloadAction<Todo>) {
            state.push(action.payload);
        },
        toggleTodo(state, action: PayloadAction<Todo>) {
            let todo = state.find(todo => todo.id === action.payload.id);

            if (todo) {
                todo.isCompleted = !todo.isCompleted;
                toggleTodoPatch(todo.id, todo.isCompleted)
            }
        },
        toggleAllTodos(state) {
            if (state.some(todo => todo.isCompleted === false)) {
                toggleAllTodosPatch(true);
                state.map(todo => todo.isCompleted = true)
            } else {
                toggleAllTodosPatch(false);
                state.map(todo => todo.isCompleted = false)
            }
        }
    }
});

export const { toggleTodo, toggleAllTodos } = todoSlice.actions;
//export const { toggleAllTodos } = todoSlice.actions.toggleAllTodos;

//?
export const createTodoList = (): AppThunk => async (dispatch: AppDispatch) => {
    window.history.pushState(null, document.title, '');
}

export const loadTodos = (): AppThunk => async (dispatch: AppDispatch) => {
    const todos = await fetchTodos();
    dispatch(todoSlice.actions.receiveTodos(todos))
}

export const addTodo = (
    text: string
): AppThunk => async (dispatch: AppDispatch) => {
    const newTodo: Todo = {
        id: '',
        isCompleted: false,
        name: text,
    }

    dispatch(todoSlice.actions.receiveTodo(newTodo));
}

export default todoSlice.reducer;
