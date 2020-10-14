import React from "react";

const Form = ({ setInputText, todos, setTodos, inputText, setStatus }) => {
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };
  const submitTodoHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { text: inputText, completed: false, id: Math.random() * 1000 }
    ]);
    setInputText("");
  };
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  const completeAllHandler = (e) => {
    e.preventDefault();
    if (!todos.some(item => item.completed === false)) {
      setTodos(
        todos.map((item) => {
          return { ...item, completed: false };
        }));

    } else {
      setTodos(
        todos.map((item) => {
          return { ...item, completed: true };
        }));
    }
  };
  const removeCompletedHandler = (e) => {
    e.preventDefault();
    setTodos(todos.filter((item) => item.completed === false));
  };

  return (
    <form>
      <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
      <button onClick={submitTodoHandler} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
      <button onClick={completeAllHandler}>Complete All</button>
      <button onClick={removeCompletedHandler}>Remove Completed</button>
    </form>
  );
};

export default Form;
