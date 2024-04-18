import React from "react";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";

interface TodoListProps {
  id: string;
  mission: string;
  isDone: boolean;
  created: string;
  addRandomBackground: string;
  deleteFunction: (id: string) => void;
  editFunction: (id: string) => void;
  doneFunction: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  id,
  mission,
  isDone,
  created,
  addRandomBackground,
  deleteFunction,
  editFunction,
  doneFunction,
}) => {
  return (
    <div
      className={`todo-item ${isDone ? "todo-item-done" : ""}`}
      style={{ backgroundColor: addRandomBackground }}
    >
      {/* <span className="todo-span-style">{mission}</span> */}
      <div className="todo-item__content">
        <div
          style={{ opacity: isDone ? ".5" : "1" }}
          onClick={() => doneFunction(id)}
          className={`todo-item__mission ${
            isDone ? "todo-item__mission-done" : ""
          }`}
        >
          {/* <span className="todo-item__mission-status"> </span> */}
          {mission}
        </div>
        <div className="todo-item__buttons">
          <button
            onClick={() => deleteFunction(id)}
            className="todo-item__button-delete"
          >
            <DeleteOutlined />
          </button>
          <button
            onClick={() => editFunction(id)}
            className="todo-item__button-edit"
          >
            <EditOutlined />
          </button>
        </div>
      </div>
      <div className="todo-item__timestamp">
        Created: {created}
        {/* {todo.edited && <span>, Edited: {todo.edited.toLocaleString()}</span>} */}
      </div>
    </div>
  );
};

export default TodoList;
