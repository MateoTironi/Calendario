import "../styles/appo.css";
import { NavLink } from "react-router-dom";

export default function Appo({ appointment, clickDay, avDays }) {
  const renderAppo = (appointment, clickDay, avDays) => {
    let appo = [];
    const reserved = appointment[0].filter(
      (e) =>
        e.date.split("-")[1] === `0${clickDay.month}` && e.date.split("-")[2] === `${clickDay.day}`
    );

    reserved.forEach((e) => {
      appo.push(e);
    });

    const dispDays = avDays[0].filter(
      (e) =>
        e.date.split("-")[1] === `0${clickDay.month}` && e.date.split("-")[2] === `${clickDay.day}`
    );
    dispDays.forEach((e) => {
      appo.push(e);
    });
    appo = appo.sort((a, b) => {
      if (a.hour > b.hour) return 1;
      if (a.hour < b.hour) return -1;
      return 0;
    });

    return appo;
  };
  // console.log(renderAppo(appointment, clickDay, avDays));
  return (
    <div className="wrapper_appo">
      {renderAppo(appointment, clickDay, avDays).map((e) => {
        if (!e.email) {
          return (
            <div className="appo_container">
              <h5 className="appo_res">{e.hour}</h5>
            </div>
          );
        }
        return (
          <div className="appo_container_r">
            <h5 className="appo_res">
              {e.hour}
              <NavLink to={`/appo/${e.id}`} className={"arrow"}>
                {">"}
              </NavLink>
            </h5>
          </div>
        );
      })}
      <hr />
      <NavLink to={`/createDate`} className="new_day">
        Crear una nueva fecha
      </NavLink>
    </div>
  );
}
