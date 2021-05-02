import React from "react"
import TodoItem from "./TodoItem"
import {Droppable} from "react-beautiful-dnd"

const TodosList = props => {

	return (
		
		<Droppable droppableId={props.column}>
			{(provided) =>(
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					{props.todos.map((todo,index) => (	
						<TodoItem
							key={todo.order}
							index={index}
							todo={todo}
							handleChangeProps={props.handleChangeProps}
							deleteTodoProps={props.deleteTodoProps}
							setUpdate={props.setUpdate}
							
						/>		
					))}
					{provided.placeholder}
				</div>
			)}
			
												
		</Droppable>
		
	)
}
export default TodosList