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
    //DUMMY PROJECTSDUMMY DUMMYDUMMY DUMMYDUMMY DUMMYDUMMY DUMMYDUMMY DUMMYDUMMY 
    const projectOne = createProject("I am A project!")
    const projectTwo = createProject("I am Another project!")
    projectArray.push(projectOne)
    projectArray.push(projectTwo)
    console.log("projectArray length:", projectArray.length); // Output the length of projectArray

    //DUMMY Log details of each project
    projectArray.forEach((project, index) => {
        console.log(`Project ${index}:`, project.getTodos());
    });
    // DUMMY DUMMY DUMMY DUMMYDUMMY DUMMYDUMMY DUMMYDUMMY DUMMYDUMMY DUMMYDUMMY 
    
    
    // Remove the Project from Project Array
    function removeProjectFromArray(index) {
        projectArray.splice(index, 1)
        console.log(`Project ${index}: Was removed`);
    }
}




export { createProject, projectHandler };

