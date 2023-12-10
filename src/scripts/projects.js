import { compareAsc, format } from 'date-fns';
//FIXME what import do you need from the date-fns?

function createProject (name) {
    //Array to hold the Todos
    let todoArray = []
    const name = name;
    
    const getName = () => name;
    //Uses the spread operator (...) 
    //to create a shallow copy of the original array.
    const getTodos = () => [...todoArray];

    //Create a Todo at the last index 
    const addTodo = (todo) => {
        todoArray.push(todo);
    } 

    //Remove the Todo at given index
    const removeTodo = (index) => {
        todoArray.splice(index, 1);
    }

    return { getTodos, addTodo, removeTodo }
}

// Create Todo's that will go into your projects
function createTodo(title, description, dueDate, priority) {
    //FIXME Make use of me!
    const priorityArray = ["Urgent", "Important", "Normal"]
    const title = title;
    const description = description;
    //FIXME Using the new date modules
    const dueDate = dueDate; 
    const priority = priority;
    //state of checklist of current to-do
    let checked = false;

    // toggle the state of checklist, something something immutability...
    const toggleCheck = () => {
        const newChecked = !checked;
        checked = newChecked;
        return newChecked;
    };

    //Getters
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getChecked = () => checked;

    return { getTitle, getDescription, getDueDate, getPriority, getChecked, toggleCheck }
}

//TODO Access todo and be able operate on them
function todoHandler(todo) {
    
    const setTitle = (newTitle) => {
        // Create a new todo with the updated title and the same values for other properties
        return createTodo(newTitle, todo.getDescription(), todo.getDueDate(), todo.getPriority());
    };

    const setDescription = (newDesc) => {
        return createTodo(todo.getName(), newDesc, todo.getDueDate(), todo.getPriority());
    }

    const setdueDate = (newDate) => {
        return createTodo(todo.getName(), todo.getDescription(), newDate, todo.getPriority());
    }
    
    const setPriority = (newPriority) => {
        return createTodo(todo.getName(), todo.getDescription(), todo.getDueDate(), newPriority);
    }

    return { setTitle, setDescription, setdueDate, setPriority }
}


export default { createProject, createTodo, todoHandler }
