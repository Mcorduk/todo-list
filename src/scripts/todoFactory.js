import { compareAsc, format } from 'date-fns';


// Create Todo's that will go into your projects
const createTodo = (todoTitle, todoDescription, todoDueDate, todoPriority) => {
    //FIXME Make use of me!
    const priorityArray = ["Urgent", "Important", "Normal"]
    const title = todoTitle;
    const description = todoDescription;
    //FIXME Using the new date modules
    const dueDate = new Date();

    const priority = todoPriority;
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
const todoHandler = (todo) => {
    
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





export { createTodo, todoHandler };
