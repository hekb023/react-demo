import Axios from "axios";
import { getRedirectPath } from "../util";

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";

const initState = {
  redirectTo: "",
  isAuth: false,
  msg: "",
  user: "",
  type: ""
};
export function user(state = initState, action) {
  console.log(action.data);
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: "",
        redirectTo: getRedirectPath(action.data),
        ...action.data
      };
    case LOAD_DATA:
      return { ...state, ...action.data };
    case ERROR_MSG:
      return { ...state, msg: action.msg, isAuth: false };
    default:
      return state;
  }
}

export function authSuccess(data) {
  return { data, type: "AUTH_SUCCESS" };
}

export function loadData(data) {
  return { data, type: "LOAD_DATA" };
}

export function errorMsg(msg) {
  return { msg, type: "ERROR_MSG" };
}

export function update(data) {
  return dispatch => {
    Axios.post("/user/update", data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg("用户名密码必须输入");
  }
  return dispatch => {
    Axios.post("/user/login", { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd) {
    return errorMsg("用户名密码必须输入");
  }
  if (pwd !== repeatpwd) {
    return errorMsg("密码和确认密码不同");
  }
  return dispatch => {
    Axios.post("/user/register", { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, pwd, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
