import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from 'app/store'
import { RootState } from 'app/rootReducer';
import { deleteCompletedTodos, deleteTodo, toggleAllTodosPatch, toggleTodoPatch, writeTodo, readTodos as fetchTodos } from 'api/localhost';
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
                toggleTodoPatch(todo.id, todo.isCompleted)
                todo.isCompleted = !todo.isCompleted;
            }
        },
        toggleAllTodos(state) {
            if (state.some(todo => todo.isCompleted === false)) {
                toggleAllTodosPatch(true);
                state.map(todo => todo.isCompleted = true);
            } else {
                toggleAllTodosPatch(false);
                state.map(todo => todo.isCompleted = false);
            }
        },
        removeTodo(state, action: PayloadAction<string>) {
            deleteTodo(action.payload);
            return state.filter(todo => todo.id !== action.payload);
        }, 
        removeCompletedTodos(state) {
            deleteCompletedTodos(); 
            return state.filter(todo => todo.isCompleted === false);
        }
    }
});

export const { removeTodo, toggleTodo, toggleAllTodos, removeCompletedTodos } = todoSlice.actions;

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
