import React, { useEffect, useState, useRef } from "react";
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
  const missionContainerRef = useRef<HTMLDivElement>(null);
  const previousLengthRef = useRef<number>(mission.length);

  useEffect(() => {
    window.localStorage.setItem("missions", JSON.stringify(mission));
    if (mission.length > previousLengthRef.current) {
      scrollToBottom();
    }
    previousLengthRef.current = mission.length;
  }, [mission]);

  const scrollToBottom = () => {
    if (missionContainerRef.current) {
      missionContainerRef.current.scrollTop =
        missionContainerRef.current.scrollHeight;
    }
  };
  function getRandomBackground(): string {
    let getDegree = Math.floor(Math.random() * 395);
    return `hsl(${getDegree}deg 50% 60%)`;
  }

  const addMission = (e: React.FormEvent): void => {
    e.preventDefault();

    const dateCreated = new Date();

    const dayCreated = dateCreated.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const hourCreated = dateCreated.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    if (todo) {
      setMission((prev) => [
        ...prev,
        {
          id: nanoid(), // Use nanoid to generate unique IDs
          mission: todo,
          isDone: false,
          created: `${dayCreated} ${hourCreated}`,
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
  function doneFunction(id: string) {
    setMission((prev) =>
      prev.map((el) => (el.id === id ? { ...el, isDone: !el.isDone } : el))
    );
  }
  return (
    <div className="todo-app">
      <div className="input">
        <InputFeilds
          id={editMissionID}
          todo={todo}
          setTodo={setTodo}
          addMission={addMission}
          isEdite={isEdit}
          editMission={(id) => editMission(id)}
        />
      </div>

      <div ref={missionContainerRef} className="todo-container">
        {mission.length === 0 ? (
          <h2
            style={{ textAlign: "center", color: "white", fontWeight: "200" }}
          >
            "You Have 0 To Do 😩"
          </h2>
        ) : (
          mission.map((element) => (
            <TodoList
              key={element.id}
              id={element.id}
              mission={element.mission}
              isDone={element.isDone}
              created={element.created}
              addRandomBackground={element.background}
              deleteFunction={(id) => deleteFunction(id)}
              editFunction={(id) => editFunction(id)}
              doneFunction={(id) => doneFunction(id)}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default App;
