import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./Style.css";
import InputFeilds from "./components/InputFeilds";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
const getLocalStorage = (): Todo[] => {
  const missions = localStorage.getItem("missions");
  return missions ? JSON.parse(missions) ?? [] : [];
};

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [mission, setMission] = useState<Todo[]>(getLocalStorage);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editMissionID, setEditMissionID] = useState<string>("");

  useEffect(() => {
    window.localStorage.setItem("missions", JSON.stringify(mission));
  }, [mission]);

  function getRandomBackground(): string {
    let getDegree = Math.floor(Math.random() * 395);
    return `hsl(${getDegree}deg 36.65% 68.43%)`;
  }

  const addMission = (e: React.FormEvent): void => {
    e.preventDefault();
    if (todo) {
      setMission((prev) => [
        ...prev,
        {
          id: nanoid(), // Use nanoid to generate unique IDs
          mission: todo,
          isDone: false,
          created: new Date(),
          background: getRandomBackground(),
        },
      ]);
      setTodo("");
    }
  };

  function deleteFunction(id: string) {
    setMission((prev) => prev.filter((el) => el.id !== id));
  }

  function editFunction(id: string) {
    let theEdit = mission.filter((el) => el.id === id);
    setTodo(theEdit[0].mission);
    setEditMissionID(theEdit[0].id);
    setIsEdit(true);
  }

  const editMission = (id: string, e?: React.FormEvent): void => {
    e?.preventDefault();
    if (todo) {
      setMission((prev) =>
        prev.map((el) => (el.id === id ? { ...el, mission: todo } : el))
      );
    }
    setTodo("");
    setIsEdit(false);
  };

  return (
    <div className="todo-app">
      <InputFeilds
        id={editMissionID}
        todo={todo}
        setTodo={setTodo}
        addMission={addMission}
        isEdite={isEdit}
        editMission={(id) => editMission(id)}
      />

      <div className="todo-container">
        {mission.length === 0 ? (
          <h2
            style={{ textAlign: "center", color: "white", fontWeight: "200" }}
          >
            "You Have 0 To Do 😩"
          </h2>
        ) : (
          mission.map((element) => (
            <TodoList
              id={element.id}
              mission={element.mission}
              created={element.created}
              addRandomBackground={element.background}
              deleteFunction={(id) => deleteFunction(id)}
              editFunction={(id) => editFunction(id)}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default App;
