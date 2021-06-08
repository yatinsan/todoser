import { useState,useEffect } from 'react';
import './App.css';


function App() {


  const [Filter, setFilter] = useState('all')
  const [toDos, setToDos] = useState("")
  const [toDo, setToDo] = useState('')
  const [err, seterr] = useState(false)

  const addToDo = (e) => {
    e.preventDefault()
    if (toDo !== '') {
      setToDos([...toDos, { id: Date.now(), name: toDo, isDone: false }])
      setToDo('')
    }
    else {
      seterr(true)
    }

  }

  const changeDone = (id) => {
    setToDos(toDos.filter((obj) => {
      if (obj.id === id) {
        obj.isDone = !obj.isDone

      }
      return obj
    }))
    console.log(id)
  }

  const toDoDelete = (id) => {
    setToDos(toDos.filter((obj) => {
      if (obj.id === id) return null
      return obj
    }))
  }

  useEffect(() => {
    if (!localStorage) return;

    if (toDos==='') {
      console.log('load')
        let savedTodos = localStorage.getItem("todos");
        if (savedTodos && savedTodos.length !== 0) {
            setToDos(JSON.parse(savedTodos))
        }
    } else {
        localStorage.setItem("todos", JSON.stringify(toDos))
    }

}, [toDos]);



  return (
    <div className="App" >
      <div className="page">
        <h1>ToDo App</h1>
        <form className="todoform">
          <div className="input">
            <input className='todoin' type="text" placeholder='To Do ??' value={toDo} onChange={(e) => {
              setToDo(e.target.value)
              if (e.target.value) {
                seterr(false)
              }
            }} autoFocus />
          
            <button onClick={addToDo} type="submit"><i className="fas fa-plus"></i></button>
          </div>
          {err && <p className="error-message">Oops! Todo cannot be blank</p>}
        </form>
        <div className="options">
          <button type="button" onClick={() => { setFilter('all') }} className={Filter === 'all' ? "btn btn-primary btn" : "btn-outline-primary btn"} >all</button>
          <button type="button" onClick={() => { setFilter('done') }} className={Filter === 'done' ? "btn btn-primary btn" : "btn-outline-primary btn"}>Completed</button>
          <button type="button" onClick={() => { setFilter('toDo') }} className={Filter === 'toDo' ? "btn btn-primary btn" : "btn-outline-primary btn"}>ToDo</button>
        </div>

        <ul className="list-group list-group-flush oder">
          {toDos !=="" && toDos.map((obj) => {
            if (Filter === 'done' && !obj.isDone) return null
            if (Filter === 'toDo' && obj.isDone) return null
            return (<li className="" key={obj.id}><button className='check' onClick={() => { changeDone(obj.id) }}><i className={obj.isDone ? "status bi bi-check-square-fill" : "statusk bi bi-check-square"}></i></button><h3>{obj.name}</h3>   <button className='delet' onClick={() => { toDoDelete(obj.id) }}><i className="bi bi-x-octagon"></i></button></li>)

          })}





        </ul>


      </div>
    </div>);

}

export default App;