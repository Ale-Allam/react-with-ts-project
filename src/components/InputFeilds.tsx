import React, { useRef } from "react";

interface InputFieldsProps {
  id: string;
  todo: string;
  isEdite: boolean;
  addMission(e: React.FormEvent): void;
  editMission(id: string, e?: React.FormEvent): void;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}

const InputFeilds: React.FC<InputFieldsProps> = ({
  id,
  todo,
  isEdite,
  addMission,
  editMission,
  setTodo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    isEdite ? editMission(id, e) : addMission(e);

    inputRef.current?.blur();
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div>
        <div className="form__group field">
          <input
            ref={inputRef}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            placeholder=""
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
          {isEdite ? "Edite" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default InputFeilds;
