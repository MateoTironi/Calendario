import { useDispatch } from "react-redux";
import "../styles/appo.css";
import { createDate } from "../actions";
import { NavLink } from "react-router-dom";

export default function CreateDate({ clickDay }) {
  let dispatch = useDispatch();
  const now = new Date();
  const year = now.getFullYear();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      createDate({
        date: `${year}-${clickDay.month}-${clickDay.day}`,
        hour: e.target[0].value + ":00",
        reserved: false,
      })
    );
    alert("Fecha creada con exito");
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      {/* <div>
        <label>Fecha: </label>
        <input placeholder="YYYY-MM-DD"></input>
      </div> */}
      <div>
        <label>Hora: </label>
        <input type="time"></input>
      </div>
      <button onSubmit={handleSubmit}>Crear</button>
    </form>
  );
}
