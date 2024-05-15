import {
  CLEAN_STATE,
  CREATE_APPO,
  CREATE_DATE,
  CREATE_USER,
  GET_APPO,
  GET_APPO_ID,
  GET_DATE,
  GET_DAYOFF,
  GET_USER_ID,
  GET_USER_NAME,
  UPDATE_DATE,
} from "../actions";

const initialState = {
  date: [],
  dayOff: [],
  user: [],
  userDetail: [],
  appointment: [],
  appoDetail: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    //-----------------------------DATE----------------------------------
    case GET_DATE:
      localStorage.setItem("dispDays", JSON.stringify([action.payload]));
      return {
        ...state,
        date: [action.payload],
      };

    case GET_DAYOFF:
      return {
        ...state,
        dayOff: [action.payload],
      };

    case CREATE_DATE:
      return {
        ...state,
        date: [...state.date, action.payload],
      };

    //-----------------------------APPOINTMENT----------------------------------
    case GET_APPO:
      localStorage.setItem("appoint", JSON.stringify([action.payload]));
      return {
        ...state,
        appointment: [...state.appointment, action.payload],
      };

    case GET_APPO_ID:
      return {
        ...state,
        appoDetail: [action.payload],
      };

    case CREATE_APPO:
      return {
        ...state,
        appointment: [...state.appointment, action.payload],
      };
    //-----------------------------USER----------------------------------
    case GET_USER_NAME:
      return {
        ...state,
        userDetail: [action.payload],
      };

    case GET_USER_ID:
      return {
        ...state,
        userDetail: [action.payload],
      };

    case CREATE_USER:
      return {
        ...state,
        user: [...state.user, action.payload],
      };

    case CLEAN_STATE:
      return {
        ...state,
        date: [],
      };

    default:
      return state;
  }
}
