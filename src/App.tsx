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
  // localStorage.clear();
  useEffect(() => {
    window.localStorage.setItem("missions", JSON.stringify(mission));
  }, [mission]);
  function getRandomBackground(): string[] {
    let getDegree = Math.floor(Math.random() * 395);
    // `hsl(${getDegree}deg 90% 61.57%)`
    return [
      `hsl(${getDegree}deg 52.04% 61.57%)`,
      `hsl(${getDegree}deg 80% 61.57%)`,
    ];
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
          background1: getRandomBackground()[0],
          background2: getRandomBackground()[1],
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
  }
  return (
    <div className="todo-app">
      <InputFeilds todo={todo} setTodo={setTodo} addMission={addMission} />

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
              addRandomBackground1={element.background1}
              addRandomBackground2={element.background2}
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
