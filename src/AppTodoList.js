import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/dist/v4';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function AppTodoList() {
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

  function toggleTodo(id) {
    // id is stored in Todo component -> we need to pass that fn to TodoList
    const newTodos = [...todos];
    // create a copy because you should NEVER directly modify state
    // 1st create a copy before modifying it
    // then use that copy to set the new state
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

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

  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add todo</button>
      <button onClick={handleClearTodo}>Clear complete</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
    </>
  );
}

export default AppTodoList;
