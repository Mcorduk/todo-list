import { compareAsc, format } from 'date-fns';
import { createTodo, todoHandler } from './todoFactory';
//FIXME what import do you need from the date-fns?


// Main Factory function to create elements
const elFactory = (type, attributes, ...children) => {
    const el = document.createElement(type)
    
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
  
    children.forEach(child => {
        if (typeof child === "string") {
            const newText = document.createTextNode(child);
            el.append(newText);
        } else {
            el.append(child)
        }
    });
    return el
  }

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

    const replaceTodo = (index, newTodo) => {
        todoArray[index] = newTodo;
    }

    return { getTodos, addTodo, removeTodo, replaceTodo, todoArray }
}


//Handler for Project Objects
const projectHandler = () => {

    let projectArray = [];


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

//Initiate a project handler
const ProjectHandler = projectHandler()


export { ProjectHandler, createProject, elFactory };


