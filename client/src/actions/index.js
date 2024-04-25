import axios from "axios";

export const GET_DATE = "GET_DATE";
export const CREATE_APPO = "CREATE_APPO";
export const CREATE_DATE = "CREATE_DATE";
export const GET_APPO = "GET_APPO";
export const GET_APPO_ID = "GET_APPO_ID";
export const GET_USER_NAME = "GET_USER_NAME";
export const GET_USER_ID = "GET_USER_ID";
export const CREATE_USER = "CREATE_USER";
export const CLEAN_STATE = "CLEAN_STATE";
export const UPDATE_DATE = "UPDATE_DATE";
export const GET_DAYOFF = "GET_DAYOFF";

//-----------------------------DATE----------------------------------
export function getDate() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/dates")
      .catch((err) => alert(err))
      .then((r) => dispatch({ type: GET_DATE, payload: r.data }));
  };
}

export function getDayOff() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/dayOff")
      .catch((err) => alert(err))
      .then((r) => dispatch({ type: GET_DAYOFF, payload: r.data }));
  };
}

export function createDate({ date, hour, reserved }) {
  console.log(date, hour, reserved);
  return function (dispatch) {
    axios
      .post("http://localhost:3001/dates", {
        date,
        hour,
        reserved,
      })
      .catch((err) => alert(err))
      .then((r) => dispatch({ type: CREATE_DATE, payload: r.data }));
  };
}

export function updateDate({ id }) {
  return function (dispatch) {
    axios.put(`http://localhost:3001/date/${id}`).catch((err) => alert(err));
  };
}

//-----------------------------APPOINTMENT----------------------------------
export function getAppoId(id) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/appointment/${id}`)
      .catch((err) => alert(err))
      .then((r) => dispatch({ type: GET_APPO_ID, payload: r.data }));
  };
}

export function getAppo() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/appointment")
      .catch((err) => alert(err))
      .then((r) => dispatch({ type: GET_APPO, payload: r.data }));
  };
}

export function createAppo({ petName, email, number, service, profesional, date, hour }) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/appointment", {
        petName,
        email,
        number,
        service,
        profesional,
        date,
        hour,
      })
      .catch((err) => alert(err))
      .then((r) => dispatch({ type: CREATE_APPO, payload: r.data }));
  };
}

//-----------------------------USER----------------------------------
export function getUserName(name) {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/user", { name })
      .catch((err) => alert(err))
      .then((r) => dispatch({ type: GET_USER_NAME, payload: r.data }));
  };
}

export function getUserId(id) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/user/${id}`)
      .catch((err) => alert(err))
      .then((r) => dispatch({ type: GET_USER_ID, payload: r.data }));
  };
}

export function createUser({ name, password, gmail, number }) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/user", {
        name,
        password,
        gmail,
        number,
      })
      .catch((err) => alert(err))
      .then((r) => dispatch({ type: CREATE_USER, payload: r.data }));
  };
}

//-----------------------------CLEAN----------------------------------
export function cleanState() {
  return {
    type: CLEAN_STATE,
  };
}
