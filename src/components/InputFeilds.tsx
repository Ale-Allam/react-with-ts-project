import React, { useRef } from "react";

interface InputFieldsProps {
  todo: string;
  addMission(e: React.FormEvent): void;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}

const InputFeilds: React.FC<InputFieldsProps> = ({
  todo,
  addMission,
  setTodo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMission(e);

    inputRef.current?.blur();
  };

  return (
    <form className="input" onSubmit={handleSubmit}>
      <div>
        <div className="form__group field">
          <input
            ref={inputRef}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            placeholder="Enter Your Task"
            className="form__field"
            name="name"
            id="name"
            required
          />
          <label htmlFor="name" className="form__label">
            ToDo!
          </label>
        </div>
        <button className="input__submit" type="submit">
          Button 29
        </button>
      </div>
    </form>
  );
};

export default InputFeilds;
