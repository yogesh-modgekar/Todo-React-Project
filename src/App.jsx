import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import {FaEdit} from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'

function App() {

  const [todo, setTodo] = useState("")

  const [todos, setTodos] = useState([])
  const [showFinish, setShowFinish] = useState(true)

  useEffect(()=>{
    let todoString = localStorage.getItem('todos')
    if(todoString){
    let todos = JSON.parse(localStorage.getItem('todos'))
    setTodos(todos)
    }
  },[])

  const saveToLS = (params)=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  }

  const toggleFinish = (e) => {
     setShowFinish(!showFinish)
  }

  const handleEdit = (e,id)=>{
      let t = todos.filter(i=>i.id === id)
      setTodo(t[0].todo)
      let newTodos = todos.filter(item=>{
        return item.id!==id
      });
      setTodos(newTodos)
      saveToLS()
  }

  const handleDelete = (e,id)=>{
     let newTodos = todos.filter(item =>{
      return(
        item.id!==id
      )
     });
     setTodos(newTodos)
     saveToLS()
  }

  const handleAdd = ()=>{
  setTodos([...todos,{id: uuidv4(),todo, iscompleted: false}])
  setTodo('')
  saveToLS()
  }

  const handleChange = (e)=>{
    setTodo(e.target.value)
    }

   const handleCheckbox =(e)=>{
    let id = e.target.name 
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos)
    saveToLS()
   } 

  return (
    <>
    <Navbar/>
    <div className='mx-3 md:container md:mx-auto my-5 bg-slate-300 p-5 rounded-xl min-h-[80vh] md:w-1/2'>
        
        <h1 className=' font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
        <div className='addtodo my-5 flex flex-col gap-4'>
           <h2 className=' text-lg font-bold'>Add a Todo</h2>
           <input onChange={handleChange} value={todo} type="text" className=' w-full rounded-lg px-5 py-1' />
           <button  onClick={handleAdd} disabled={todo.length<=1} className=' bg-blue-600 text-white rounded-md p-3 py-1 hover:bg-blue-700 font-bold disabled:bg-blue-600 cursor-pointer'>Add</button>
        </div>

        <input onChange={toggleFinish} type="checkbox" checked={showFinish} /> Show Finished Tasks

        <h2 className=' text-xl font-bold py-2'>Your Todos :</h2>
        <div className='todos'>
          {todos.length ===0 && <div className=' m-5'>No Todos to Display..!</div>}
          {todos.map(item=>{
      
        return (showFinish || !item.iscompleted) && <div key={item.id} className='todo flex md:w-1/2 justify-between my-3'>
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} id='' />
          <div className={item.iscompleted ? ' line-through' : ''}>{item.todo}</div>

            <div className='buttons flex h-full'>
              <button onClick={(e)=>handleEdit(e, item.id)} className=' bg-green-600 text-white rounded-md mx-2 p-3 py-1 hover:bg-green-700 font-bold'><FaEdit/></button>

              <button onClick={(e)=>{handleDelete(e,item.id)}} className=' bg-red-600 text-white rounded-md mx-2 p-3 py-1 hover:bg-red-700 font-bold'><AiFillDelete/></button>
          </div>
        </div>
       })}
    </div>
    </div>
    </>
  )
}

export default App
