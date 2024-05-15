import React, { useEffect, useState } from "react";
import "../styles/admin.css";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getAppo, getDate } from "../actions";
import Appo from "./Appoint";

export default function Admin() {
  let dispatch = useDispatch();
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  var now = new Date();
  var day = now.getDate();
  let [month, setMonth] = useState(now.getMonth());
  let [year, setYear] = useState(now.getFullYear());
  let [apposhow, setAppoShow] = useState(JSON.parse(localStorage.getItem("apposhow")));
  let currentMonth = now.getMonth();

  useEffect(
    (e) => {
      dispatch(getAppo());
      dispatch(getDate());
      localStorage.setItem("apposhow", false);
    },
    [dispatch]
  );

  // let appointment = useSelector((state) => state.appointment);
  // let avDays = useSelector((state) => state.date);

  let [clickDay, setClick] = useState(JSON.parse(localStorage.getItem("clickDay")));

  let dispDays = JSON.parse(localStorage.getItem("dispDays"));
  let appoint = JSON.parse(localStorage.getItem("appoint"));
  // let clickDay = JSON.parse(localStorage.getItem("clickDay"));

  const getNextMonth = () => {
    if (month !== 11) {
      setMonth(month + 1);
    } else {
      setYear(year + 1);
      setMonth(0);
    }
  };

  const getPrevMonth = () => {
    if (month !== 0) {
      setMonth(month - 1);
    } else {
      setYear(year - 1);
      setMonth(11);
    }
  };

  const starDay = () => {
    let start = new Date(year, month, 1);

    return start.getDate() - 1 === -1 ? 6 : start.getDay();
  };

  const leapMonth = () => {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  };

  const getTotalDays = (month) => {
    if (month === -1) month = 11;
    if (month == 3 || month == 5 || month == 8 || month == 10) {
      return 30;
    } else if (
      month == 0 ||
      month == 2 ||
      month == 4 ||
      month == 6 ||
      month == 7 ||
      month == 9 ||
      month == 11
    ) {
      return 31;
    } else {
      return leapMonth() ? 29 : 28;
    }
  };

  const arrOfDays = (day) => {
    let arr = [];
    for (let i = starDay(); i > 0; i--) {
      arr.push({
        day: getTotalDays(month - 1) - (i - 1),
        prev: true,
      });
    }
    // console.log(getTotalDays(month));
    for (let i = 1; i <= getTotalDays(month); i++) {
      if (i < day && month === currentMonth) {
        arr.push({
          day: i,
          prev: true,
        });
      } else {
        arr.push(i);
      }
    }
    return arr;
  };

  const appo = (e) => {
    setAppoShow(false);
    let m = month;
    let d = e.target.value;
    if (m < 10) {
      m = `0${month + 1}`;
    } else m = month + 1;

    if (d < 10) {
      d = `0${d}`;
    }
    localStorage.setItem("clickDay", JSON.stringify({ day: d, month: m }));
    localStorage.setItem("apposhow", true);

    setClick({ day: d, month: m });
    setAppoShow(true);
  };

  return (
    <div className="admin">
      <div class="wrapper">
        <header>
          <p class="current-date">
            {months[month]} {year}
          </p>
          <div class="icons">
            <span id="prev" class="material-symbols-rounded" onClick={getPrevMonth}>
              {"<"}
            </span>
            <span id="next" class="material-symbols-rounded" onClick={getNextMonth}>
              {">"}
            </span>
          </div>
        </header>
        <div class="calendar">
          <ul class="weeks">
            <li>Dom</li>
            <li>Lun</li>
            <li>Mar</li>
            <li>Mie</li>
            <li>Jue</li>
            <li>Vie</li>
            <li>Sab</li>
          </ul>
          <ul class="days">
            {arrOfDays(day).map((e) => {
              if (e.prev) {
                return <li className="prev_days">{e.day}</li>;
              }
              return (
                <li className="av_days" value={e} onClick={appo}>
                  {e}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {apposhow ? <Appo appointment={appoint} clickDay={clickDay} avDays={dispDays} /> : null}
    </div>
  );
}
