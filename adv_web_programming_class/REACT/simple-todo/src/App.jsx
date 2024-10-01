import { useState } from 'react'
import './App.css'

function App() {
const [todos, setTodos]= useState([])
const [newTodo, setNewTodos]= useState('')


const handleChange = event =>{
  setNewTodos(event.target.value)
}
const TodoItem =({text}) => {
  return <li>{text}</li>
}

const handleSubmit= (event)=> {
event.preventDefault()
const newTodos =[...todos, newTodo]
setTodos(newTodo)
setNewTodo("")
console.log(updatedTodos);

}

  return (
    <>
  <h1>Simple To-Do List</h1>
  
  <form onSubmit={handleSubmit}>
    <input 
    className='todo-input'
    autoComplete='off'
    type="text" 
    placeholder='What needs to be done'
    name='newTodo'
    value={newTodo}
    onChange={handleChange}
    />
    <button type="submit" className='save-button'>SAVE</button>

    </form> 

    <div className='todo-content' >
      <ol>
      
      </ol>
    </div>

    </>
  )
}

export default App
