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
  function getRandomBackground() {
    let getDegree = Math.floor(Math.random() * 395);
    // `hsl(${getDegree}deg 90% 61.57%)`
    return `hsl(${getDegree}deg 52.04% 61.57%)`;
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
  console.log(mission);
  return (
    <div className="todo-app">
      <InputFeilds todo={todo} setTodo={setTodo} addMission={addMission} />

      <div className="todo-container">
        {mission.map((element) => (
          <TodoList
            mission={element.mission}
            created={element.created}
            addRandomBackground={element.background}
          />
        ))}
      </div>
    </div>
  );
};
export default App;
