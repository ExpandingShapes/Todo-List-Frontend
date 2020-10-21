import axios from 'axios';
import { Todo } from 'features/todoList/types';

const baseUrl = 'http://localhost:9000';

export async function readTodos(): Promise<Todo[]> {
     const response = await axios.get<Todo[]> (`${baseUrl}/api/todo-items`//, {
    //  headers: {
    //     'Access-Control-Allow-Origin': '*'
    //  }
     );
     let res: Todo[] = [];
     response.data.forEach(function(item) {
        let bar: Todo = { name : item.name, isCompleted : item.isCompleted, id : item.id };
        res.push(bar);
     });
     console.log('res is');
     console.log(res);
     return res;//response.data;//.result;
}

export async function writeTodo(text: string) {
    await axios.post<Todo>(baseUrl + '/api/todo-item', {
        name : text,
        isCompleted : false
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
}
