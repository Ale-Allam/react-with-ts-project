import React, { useState } from "react";
import "./Style.css";
import InputFeilds from "./components/InputFeilds";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [mission, setMission] = useState<string[]>([]);
  const addMission = (e: React.FormEvent): void => {
    e.preventDefault();
    setMission((prev) => [...prev, todo]);
  };
  console.log(mission);
  return (
    <div>
      <InputFeilds todo={todo} setTodo={setTodo} addMission={addMission} />
    </div>
  );
};
export default App;
