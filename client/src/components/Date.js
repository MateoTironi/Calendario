import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { addDays, isWeekend } from "date-fns";

export default function Dates({ d, avDays }) {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState([]);
  const av = [];

  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const handleChange = (date) => {
    setDate(date);
    handleHour(date);
  };

  const isWeekendDay = (date) => {
    return isWeekend(date);
  };

  const handleHour = (date) => {
    const day = date.toString(date).split(" ");
    let hour = [];
    let m;

    for (const key in months) {
      if (key === day[1]) {
        m = months[key];
      }
    }

    avDays[0].forEach((e) => {
      if (e.date.split("-")[2] === day[2] && m === e.date.split("-")[1]) {
        hour.push(e.hour);
      }
    });

    hour.sort(function (a, b) {
      if (a.split(":").join("") > b.split(":").join("")) return 1;
      if (a.split(":").join("") < b.split(":").join("")) return -1;
      return 0;
    });

    setHour(hour);
  };

  const disable = (date) => {
    const day = date.toString(date).split(" ");
    let m;

    for (const key in months) {
      if (key === day[1]) {
        m = months[key];
      }
    }

    if (av[0]) {
      const dAv = av.find((e) => {
        e.day == day[2] && e.m == m;
      });

      if (dAv) return false;
    }

    // const resDay = d[0].find((e) => e.date.split("-")[2] === day[2] && m === e.date.split("-")[1]);
    const notDate = avDays[0].find(
      (e) => e.date.split("-")[2] === day[2] && m === e.date.split("-")[1]
    );

    // const dayOff = resDay
    //   ? d[0].find(
    //       (e) =>
    //         e.date.split("-")[2] === resDay.date.split("-")[2] &&
    //         m === e.date.split("-")[1] &&
    //         e.id !== resDay.id
    //     )
    //   : false;

    // if (dayOff) {
    //   return true;
    // }
    if (!notDate) {
      return true;
    }

    av.push({ day: day[2], m });
    return false;
  };

  const disableDay = (date) => {
    return disable(date);
  };

  const filterWeekends = (date) => {
    return !isWeekendDay(date) && !disableDay(date);
  };

  const minD = new Date();

  return (
    <div>
      <DatePicker
        selected={date}
        onChange={handleChange}
        dateFormat={"dd-MM-yyyy"}
        minDate={minD}
        filterDate={filterWeekends}
        name="form_date"
      />

      <select id="horas" name="form_hour">
        {hour.map((e) => {
          return <option data-idprofesional="1">{e}</option>;
        })}
      </select>
    </div>
  );
}
