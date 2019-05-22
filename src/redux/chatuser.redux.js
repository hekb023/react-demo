import Axios from "axios";
const USER_LIST = "USER_LIST";

const initState = {
  userList: []
};

export function chatuser(state = initState, action) {
  switch (action.type) {
    case USER_LIST:
      return {...state, userList:action.data};
    default:
      return state;
  }
}

export function userList(data) {
  return { data, type: USER_LIST };
}

export function getUserList(type) {
  return dispatch => {
    Axios.get(`/user/list?type=${type}`).then(res => {
      if (res.data.code === 0) {
        dispatch(userList(res.data.data ));
      }
    });
  };
}
