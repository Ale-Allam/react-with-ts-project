import React from "react";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";

interface TodoListProps {
  id: string;
  mission: string;
  created: Date;
  addRandomBackground: string;
  deleteFunction: (id: string) => void;
  editFunction: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  id,
  mission,
  created,
  addRandomBackground,
  deleteFunction,
  editFunction,
}) => {
  const formattedDate = created.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = created.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="todo-item" style={{ backgroundColor: addRandomBackground }}>
      {/* <span className="todo-span-style">{mission}</span> */}
      <div className="todo-item__content">
        <div className="todo-item__mission">
          <span
            style={{ backgroundColor: addRandomBackground }}
            className="todo-item__mission-status"
          ></span>
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
        Created: {formattedDate} {formattedTime}
        {/* {todo.edited && <span>, Edited: {todo.edited.toLocaleString()}</span>} */}
      </div>
    </div>
  );
};

export default TodoList;
