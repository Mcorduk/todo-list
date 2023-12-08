import { compareAsc, format } from 'date-fns';


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

    const priorityArray = ["Urgent", "Important", "Normal"]
    const title = title;
    const description = description;
    //FIXME Using the new date modules
    const dueDate = dueDate; 
    const priority = priority;
    //state of checklist of that to-do
    let checked = false;
    
    return { title, description, dueDate, priority }
}

function todoHandler(todo) {
    const setTitle = (newTitle) => {
        title = newTitle;
    }

    const setDescription = (newDesc) => {
        description = newDesc;
    }

    const setdueDate = (newDate) => {
        dueDate = newDate;
    }
    
    const setPriority = (newPriority) => {
        priority = newPriority;
    }

    // toggle the state of checklist, something something immutability...
    const toggleCheck = () => {
        const newChecked = !checked;
        checked = newChecked;
        return newChecked;
    };
}
