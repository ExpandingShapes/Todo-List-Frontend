import axios from 'axios';
import { Todo } from 'features/todoList/types';

const baseUrl = 'http://localhost:9000';

export async function readTodos(): Promise<Todo[]> {
     const response = await axios.get<Todo[]> (`${baseUrl}/api/todo-items`);
     let res: Todo[] = [];
     response.data.forEach(function(item) {
        let bar: Todo = { name : item.name, isCompleted : item.isCompleted, id : item.id };
        res.push(bar);
     });
     return res;
}

export async function writeTodo(text: string) {
    await axios.post<Todo>(`${baseUrl}/api/todo-item`, {
        name : text,
        is_completed : false
     });
}

export async function toggleTodoPatch(id: string, isCompleted: boolean) {
    await axios.patch<Todo>(`${baseUrl}/api/todo-item` , {
        "id" : id,
        "is_completed" : !isCompleted
    });
}

export async function deleteTodo(id: string) {
    await axios.delete(`${baseUrl}/api/todo-item/${id}`)
}

export async function deleteCompletedTodos() {
    await axios.delete(`${baseUrl}/api/todo-items`)
}
