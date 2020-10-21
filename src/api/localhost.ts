import axios from 'axios';
import { Todo } from 'features/todoList/types';

const baseUrl = 'http://localhost:9000';

export async function readTodos(): Promise<Todo[]> {
     const response = await axios.get<Todo[]> (baseUrl + '/api/todo-items');
     let res: Todo[] = [];
     response.data.forEach(function(item) {
        let bar: Todo = { name : item.name, isCompleted : item.isCompleted, id : item.id };
        //res.push(bar);// Todo(value.name, value.isCompleted, value.id))
     });
     return res;//response.data;//.result;
}

export async function writeTodo(todo: Todo) {
    await axios.put<Todo[]>(baseUrl + '/api/todo-item', todo, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
}
