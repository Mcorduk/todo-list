import { compareAsc, format } from 'date-fns';


function createProject (name) {
    //Array to hold the Todos
    let todos = []
    const name = name;
    
    const addTodo = (todo) => {
        todos.push(todo);
    } 
    
}


function createTodo(title, description, dueDate, priority) {

    const title = title;
    const description = description;
    const dueDate = dueDate;
    const priority = priority;


    const toggleCheck = () => {checked = !checked};

    //state of checklist of that to-do
    let checked = false;
    return { title, description, dueDate, priority }
}
