//Libs
import React, {useState, useEffect} from "react"
import {  v4 as uuidv4 } from "uuid"
import { Route, Switch } from "react-router-dom"
import { DragDropContext } from "react-beautiful-dnd";


//Components
import InputTodo from "./InputTodo"
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
            completed: false,
            order: newOrder(),
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

    const onDragEnd = result => {
        const {destination, source, draggableId}=result;

        if (!destination){
            return;
        }

        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index 
        ){
            return;
        }

        const newTaskIds = getOrder();

        newTaskIds.splice(source.index,1);
        newTaskIds.splice(destination.index, 0, draggableId)

        
        var newTodos = todos.map(todo => todo)

        for(var i=0;i<newTaskIds.length;i++){
            newTodos[i].order=newTaskIds[i];
        }

        newTodos = newTodos.sort(function(a, b){
            return a.order - b.order;
        })

        setTodos(newTodos);
    }

    const getOrder = () => {
        const orderTab = []
        todos.forEach((todo)=>{
            orderTab.push(todo.order);
        })
        return orderTab;
    }

    const newOrder = () =>{
        var last = todos.length
        last = last.toString()
        return (last)
    }

    const columnOrder = ()=>{
        return ['column-1']
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
                            <DragDropContext onDragEnd={onDragEnd}>
                                {columnOrder().map((columnId) =>{
                                    const column = columnOrder();
                                    return (
                                        <TodosList 
                                            key={column[0]}
                                            column={column[0]}
                                            todos={todos} 
                                            handleChangeProps={handleChange} 
                                            deleteTodoProps={delTodo}
                                            setUpdate={setUpdate}
                                        />
                                    )
                                })}
                            </DragDropContext>
                            
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