import { compareAsc, format } from 'date-fns';


// Create Todo's that will go into your projects
const createTodo = (todoTitle, todoDescription, todoDueDate, todoPriority) => {

    const title = todoTitle;
    const description = todoDescription;
    const dueDate = new Date(todoDueDate);
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
    const getDueDate = () => `${dueDate.getFullYear()}-${dueDate.getMonth()+1}-${dueDate.getDate()}`
    const getPriority = () => priority;
    const getChecked = () => checked;

    return { getTitle, getDescription, getDueDate, getPriority, getChecked, toggleCheck }
}


export { createTodo };
