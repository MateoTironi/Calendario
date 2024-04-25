import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppoId } from "../actions";
import "../styles/appo.css";

export default function AppoDetail(props) {
  const { id } = props.match.params;

  let dispatch = useDispatch();

  useEffect(
    (e) => {
      dispatch(getAppoId(id));
    },
    [dispatch, id]
  );

  let detail = useSelector((state) => state.appoDetail);

  console.log(detail);

  return (
    <div className="appo-detail">
      {detail.map((e) => {
        return (
          <div>
            <h1 className="appo_title">{`Fecha: ${e.date}   Hs: ${e.hour}`}</h1>;
            <div class="appo_atribu">
              <label>Nombre de la mascota: </label>
              <label>{e.petName}</label>
            </div>
            <div class="appo_atribu">
              <label>Email: </label>
              <label>{e.email}</label>
            </div>
            <div class="appo_atribu">
              <label>Numero: </label>
              <label>{e.number}</label>
            </div>
            <div class="appo_atribu">
              <label>Servicio: </label>
              <label>{e.service}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
}
