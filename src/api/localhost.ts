import axios from 'axios';
import { Todo } from 'features/todoList/types';

const baseUrl = 'http://localhost:9000';

interface GetTodosResponse {
    result: Todo[],
    ok: boolean
}

export async function readTodos(): Promise<Todo[]> {
    const response = await axios.get<GetTodosResponse>(baseUrl + '/api/todo-items', {//window.location.pathname, {
    });

    return response.data.result;
}

export async function writeTodos(todos: Todo[]) {
    await axios.put<Todo[]>(baseUrl + window.location.pathname, todos, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
}
