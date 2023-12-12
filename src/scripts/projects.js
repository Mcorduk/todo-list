import { compareAsc, format } from 'date-fns';
//FIXME what import do you need from the date-fns?


const  createProject = (name) => {

    //Array to hold the Todos
    let todoArray = [];
    const projectTitle = name;
    
    const getName = () => projectTitle;
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

const projectHandler = (project) => {

    let projectArray = [];
    //DUMMY PROJECTS
    const projectOne = createProject("I am A project!")
    const projectTwo = createProject("I am Another project!")
    projectArray.push(projectOne)
    projectArray.push(projectTwo)
    console.log("projectArray length:", projectArray.length); // Output the length of projectArray

    //DUMMY Log details of each project
    projectArray.forEach((project, index) => {
        console.log(`Project ${index}:`, project.getTodos());
    });

    // Remove the Project from Project Array
    function removeProjectFromArray(index) {
        projectArray.splice(index, 1)
        console.log(`Project ${index}: Was removed`);
    }
}

// Create Todo's that will go into your projects
const createTodo = (todoTitle, todoDescription, todoDueDate, todoPriority) => {
    //FIXME Make use of me!
    const priorityArray = ["Urgent", "Important", "Normal"]
    const title = todoTitle;
    const description = todoDescription;
    //FIXME Using the new date modules
    const dueDate = todoDueDate; 
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


export { createProject, createTodo, todoHandler };

