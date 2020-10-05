import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/dist/v4';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    // JSON parse because is a String -> convert it to an array
    if(storedTodos) setTodos(storedTodos)
  }, [])
  // 1 UEff to save todos, the other to LOAD todos
  // empty arry, so it's called only once and will never change.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  // anytime our todos array changes we want to run that fn
  // in this case, we want to save new todos -> use local storage for that.
  // save todo in LS of key '...'

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos(prevTodos => {
      return [ 
        ...prevTodos, 
        {
          id: uuidv4(),
          name: name,
          complete: false,
        }
      ];
    })
    todoNameRef.current.value = null;
  }

  return (
    <>
      <TodoList todos={todos}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add todo</button>
      <button>Clear complete</button>
      <div>0 left to do</div>
    </>
  );
}

export default App;
