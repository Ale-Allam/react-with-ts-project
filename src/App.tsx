import React, { useState } from "react";
import "./Style.css";
import InputFeilds from "./components/InputFeilds";
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [mission, setMission] = useState<Todo[]>([]);

  const addMission = (e: React.FormEvent): void => {
    e.preventDefault();
    if (todo) {
      setMission((prev) => [
        ...prev,
        { id: Date.now(), mission: todo, isDone: false },
      ]);
    }
  };
  console.log(mission);
  return (
    <div>
      <InputFeilds todo={todo} setTodo={setTodo} addMission={addMission} />
      {mission.map((element) => (
        <h2>{element.mission}</h2>
      ))}
    </div>
  );
};
export default App;
