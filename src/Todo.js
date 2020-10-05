import React from 'react'

export default function Todo({todo, toggleTodo}) {

  function handleToddoClick() {
    toggleTodo(todo.id)
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.complete} onChange={handleToddoClick}/>
        {todo.name}
      </label>
    </div>
  )
}
