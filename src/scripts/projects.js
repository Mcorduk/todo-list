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


//Handler for Project Objects
const projectHandler = () => {

    let projectArray = [];

    //TODO kill me
    (function IAMADUMMY() {
        const projectOne = createProject("I am A project!")
        const projectTwo = createProject("I am Another project!")
        projectArray.push(projectOne)
        projectArray.push(projectTwo)

    })();

    function getLastIndex() {
        return projectArray.length - 1
    }
    
    const addProject = (project) => {
        projectArray.push(project)
    }

    // Remove the Project from Project Array
    const removeProject= (index) =>  {
        projectArray.splice(index, 1)
        console.log(`Project ${index}: Was removed`);
    }
    return { projectArray, addProject, getLastIndex, removeProject }
}

projectHandler()




export { createProject, projectHandler };

