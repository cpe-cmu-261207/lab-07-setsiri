import React, { useState } from "react";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";
import Todo from "./Todo";
import { useEffect } from "react";

export default function TodoCtn() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([
    { title: "Play Game", complete: true },
    { title: "Read Book", complete: false },
  ]);

  //--------------------------------------------------------------------- การโหลดการเชฟ
  useEffect(() => {
    const todoStr = localStorage.getItem("react-todos");
    if (todoStr === null)
      //fix for null only
      //undefine,null,0,""
      setTodos([]);
    else setTodos(JSON.parse(todoStr));
  }, []);

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    saveTodo();
  }, [todos]);

  const saveTodo = (idx) => {
    const todosStr = JSON.stringify(todos);
    localStorage.setItem("react-todos", todosStr);
  };
  //----------------------------------------------------------------------------

  const onKeyHandler = (e) => {
    if (e.key !== "Enter") return;

    const newTodos = [{ title: todoInput, complete: false }, ...todos];
    setTodos(newTodos);
    setTodoInput("");
  };

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    const newTodos = [...todos];
    setTodos(newTodos);
  };

  const markTodo = (idx) => {
    todos[idx].complete = !todos[idx].complete;
    setTodos([...todos]);
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const titleA = todos[idx].title;
    const completeA = todos[idx].complete;
    todos[idx].title = todos[idx - 1].title;
    todos[idx].complete = todos[idx - 1].complete;
    todos[idx - 1].title = titleA;
    todos[idx - 1].complete = completeA;
    setTodos([...todos]);
  };

  const moveDown = (idx) => {
    if (idx === todos.length - 1) return;
    const titleB = todos[idx + 1].title;
    const completeB = todos[idx + 1].complete;
    todos[idx + 1].title = todos[idx].title;
    todos[idx + 1].complete = todos[idx].complete;
    todos[idx].title = titleB;
    todos[idx].complete = completeB;
    setTodos([...todos]);
  };

  return (
    <div>
      {/* Input */}
      <input
        className="form-control mb-1 fs-4"
        placeholder="insert todo here..."
        onChange={(event) => {
          setTodoInput(event.target.value);
        }}
        value={todoInput}
        onKeyUp={onKeyHandler}
      />

      <>
        {todos.map((todo, i) => (
          <Todo
            title={todo.title}
            complete={todo.complete}
            key={i}
            onDelete={() => deleteTodo(i)}
            onMark={() => markTodo(i)}
            onMoveUp={() => moveUp(i)}
            onMoveDown={() => moveDown(i)}
          />
        ))}
      </>

      {/* summary section */}
      <p className="text-center fs-4">
        <span className="text-primary">All ({todos.length}) </span>
        <span className="text-warning">
          Pending ({todos.filter((Count) => Count.complete == false).length}){" "}
        </span>
        <span className="text-success">
          Completed ({todos.filter((Count) => Count.complete == true).length})
        </span>
      </p>
    </div>
  );
}

{
  /* Todos */
}
{
  /* Example 1 <div className="border-bottom p-1 py-2 fs-2 d-flex gap-2">
        <span className="me-auto">Todo</span>
      </div>*/
}

{
  /* Example 2 <div className="border-bottom p-1 py-2 fs-2 d-flex gap-2">
        <span className="me-auto">Todo with buttons</span>

        <button className="btn btn-success">
          <IconCheck />
        </button>
        <button className="btn btn-secondary">
          <IconArrowUp />
        </button>
        <button className="btn btn-secondary">
          <IconArrowDown />
        </button>
        <button className="btn btn-danger">
          <IconTrash />
        </button>
      </div>*/
}
