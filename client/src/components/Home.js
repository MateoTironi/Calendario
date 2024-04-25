import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/home.css";
import { cleanState, createAppo, getDate, getDayOff, updateDate } from "../actions";
import Dates from "./Date";
import { formSchema } from "./validation/formValidation";
// import * as yup from "yup";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(
    (e) => {
      dispatch(cleanState());
      dispatch(getDate());
      dispatch(getDayOff());
    },
    [dispatch]
  );

  let date = useSelector((state) => state.date);
  let dayOff = useSelector((state) => state.dayOff);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = {
      petName: event.target[0].value,
      email: event.target[1].value,
      number: event.target[2].value,
      service: event.target[3].value,
      profesional: event.target[4].value,
      date: event.target[5].value,
      hour: event.target[6].value,
    };

    const isValid = await formSchema.isValid(formData);

    if (!isValid) return alert("Ingresa los datos correctamente");

    let reservedDay = date[0].find(
      (e) =>
        e.date.split("-")[1] === formData.date.split("-")[1] &&
        e.date.split("-")[2] === formData.date.split("-")[0]
    );

    dispatch(createAppo(formData));
    dispatch(updateDate(reservedDay));
    alert(`Haz recervado el dia ${formData.date}`);
  };

  return (
    <div className="home">
      <section class="container">
        <header>Turnos</header>
        <p>Completa el siguiente formulario para reservar tu turno</p>
        <form action="#" class="form" onSubmit={handleSubmit}>
          <h2>Datos</h2>
          <div class="input-box">
            <label>Nombre de la mascota</label>
            <input type="text" placeholder="Nombre de la mascota" required />
          </div>
          <div class="input-box">
            <label>Email</label>
            <input type="text" placeholder="Email" required />
          </div>
          <div class="column">
            <div class="input-box">
              <label>Telefono celular</label>
              <div>
                <span>+54</span>
              </div>
              {/* <input className="code-area" type="tel" placeholder="Codigo de area"></input> */}
              <input className="cel-number" type="tel" placeholder="XXXXXXXX"></input>
              <small>Sin 0 ni 15. Ingrese sólo números.</small>
            </div>
          </div>
          <div class="input-box address">
            <label>Reserva</label>
            <hr />
            <label>Servicio</label>
            <div class="column">
              <div class="select-box">
                <select>
                  <option value="A1 Ecografia abdominal ($15000)">
                    A1 Ecografia abdominal ($15000)
                  </option>
                  <option value="Ecografia abdominal Doppler ($20000)">
                    Ecografia abdominal Doppler ($20000)
                  </option>
                  <option value="Ecografia renal Doppler ($18000)">
                    Ecografia renal Doppler ($18000)
                  </option>
                  <option value="Ecografia abdominal ( testículo retenido) ($15000)">
                    Ecografia abdominal ( testículo retenido) ($15000)
                  </option>
                  <option value="Ecografia abdominal ( vias urinarias) + cistocentesis ($19000)">
                    Ecografia abdominal ( vias urinarias) + cistocentesis ($19000)
                  </option>
                  <option value="Ecografia abdominal ( vías urinarias) ($15000)">
                    Ecografia abdominal ( vías urinarias) ($15000)
                  </option>
                  <option value="Ecografia abdominal + cervical (tiroides) ($20000)">
                    Ecografia abdominal + cervical (tiroides) ($20000)
                  </option>
                  <option value="Ecografia abdominal + punción ecoguiada ($22000)">
                    Ecografia abdominal + punción ecoguiada ($22000)
                  </option>
                  <option value="Ecografia abdominal + torácica ($19000)">
                    Ecografia abdominal + torácica ($19000)
                  </option>
                  <option value="Ecografia cervical ( tiroides) ($18000)">
                    Ecografia cervical ( tiroides) ($18000)
                  </option>
                  <option value="Ecografia obstétrica ($15000)">
                    Ecografia obstétrica ($15000)
                  </option>
                  <option value="Ecografia ocular ($18000)">Ecografia ocular ($18000)</option>
                  <option value="Ecografia torácica ( no cardiaca) ($15000)">
                    Ecografia torácica ( no cardiaca) ($15000)
                  </option>
                  <option value="Ecografia transcraneana ($19000)">
                    Ecografia transcraneana ($19000)
                  </option>
                  <option value=" ecografia abdominal + superficial (partes blandas) ($19000)">
                    ecografia abdominal + superficial (partes blandas) ($19000)
                  </option>
                  <option value="ecografia superficial ( partes blandas) ($15000)">
                    ecografia superficial ( partes blandas) ($15000)
                  </option>
                </select>
              </div>
            </div>

            <div className="input-box address">
              <label>Profesional</label>
              <div class="select-box">
                <select>
                  <option value="maria julia villata">maria julia villata</option>
                </select>
              </div>
            </div>
            <div>
              <label>Fecha y Hora</label>
              <Dates d={dayOff} avDays={date} />
            </div>
          </div>
          <button className="sub_button" onSubmit={handleSubmit}>
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
