//Libs
import React, {useState, useEffect} from "react"
import InputTodo from "./InputTodo"
import { v4 as uuidv4 } from "uuid"
import { Route, Switch } from "react-router-dom"

//Components
import TodosList from "./TodosList"
import Header from "./Header"
import Navbar from "./Navbar"

//Pages
import About from "../pages/About"
import NotMatch from "../pages/NotMatch"


const TodoContainer = () =>  {
    //state
    const [todos, setTodos] = useState(getInitialTodos())

    //handlers
    const handleChange = id => {
        setTodos(prevState => 
           prevState.map(todo =>{
                if(todo.id === id){
                    return {
                        ...todo,
                        completed: !todo.completed,
                    }
                }
                return todo
            })    
        )
    }

    const delTodo = (id) =>{
        setTodos([...todos.filter(todo => {
                return todo.id !== id;
            })
        ])
    }

    const addTodoItem = title =>{
        const newTodo ={
            id: uuidv4(),
            title: title,
            completed: false
        }
        setTodos([...todos, newTodo])
    }

    const setUpdate = (updatedTitle, id) => {
        setTodos(
            todos.map(todo => {
                if(todo.id === id){
                    todo.title = updatedTitle
                }
                return todo
            })
        )
    }

    //Side effects
    function getInitialTodos() {
        // getting stored items
        const temp = localStorage.getItem("todos")
        const savedTodos = JSON.parse(temp)
        
        return savedTodos || []
    }
    
    useEffect(() => {
        // storing todos items
        const temp = JSON.stringify(todos)
        localStorage.setItem("todos", temp)
    }, [todos])

    useEffect(() => {
        document.title = "todos"
      }, [])
    
    return (
        <>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <div className="container">
                        <div className="inner">
                            <Header />
                            <InputTodo addTodoProps={addTodoItem} />
                            <TodosList 
                                todos={todos} 
                                handleChangeProps={handleChange} 
                                deleteTodoProps={delTodo}
                                setUpdate={setUpdate}
                            />
                        </div>
                    </div>
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="*">
                    <NotMatch />
                </Route>
            </Switch>
        </>
    )
    
}
export default TodoContainer