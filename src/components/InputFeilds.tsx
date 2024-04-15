import React from "react";

interface Props {
  todo: string;
  addMission(e: React.FormEvent): void;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}
const InputFeilds: React.FC<Props> = (todo: Props) => {
  return (
    <form className="input">
      <input
        value={todo.todo}
        onChange={(e) => todo.setTodo(e.target.value)}
        type="text"
        placeholder="Enter Your Task"
        className="input__box"
      />
      <button onClick={todo.addMission} className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputFeilds;
