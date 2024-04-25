import { useDispatch } from "react-redux";
import "../styles/createDate.css";
import { createDate } from "../actions";
import { NavLink } from "react-router-dom";

export default function CreateDate() {
  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createDate({ date: e.target[0].value, hour: e.target[1].value, reserved: false }));
    alert("Fecha creada con exito");
  };

  return (
    <form className="create_date" onSubmit={handleSubmit}>
      <NavLink to={`/calendar`}>{"<"}</NavLink>
      <div>
        <label>Fecha: </label>
        <input placeholder="YYYY-MM-DD"></input>
      </div>
      <div>
        <label>Hora: </label>
        <input placeholder="00:00:00"></input>
      </div>
      <button onSubmit={handleSubmit}>Crear</button>
    </form>
  );
}
