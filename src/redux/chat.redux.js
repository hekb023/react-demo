import Axios from "axios";
import io from "socket.io-client";
const socket = io("ws://localhost:9093");

// 获取聊天列表
const MSG_LIST = "MSG_LIST";
// 读取信息
const MSG_RECV = "MSG_RECV";
// 标识已读
const MSG_READ = "MSG_READ";

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
};

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.data.msgs,
        users: action.data.users,
        unread: action.data.msgs.filter(v => {
          return !v.read && v.to === action.data.userid;
        }).length
      };
    case MSG_RECV:
      const unread =
        action.data.msg.to === action.data.userid
          ? state.unread + 1
          : state.unread;
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.data.msg],
        unread: unread
      };
    case MSG_READ:
      const from = action.data.from;
      const to = action.data.userid;
      const msgs = state.chatmsg.map(v => {
        if (v.from === from && v.to === to) {
          v.read = true;
        }
        return v;
      });
      return {
        ...state,
        chatmsg: [...msgs],
        unread: state.unread - action.data.num
      };
    default:
      return state;
  }
}

function msgList(msgs, users, userid) {
  return { type: "MSG_LIST", data: { msgs, users, userid } };
}

function msgRecv(msg, userid) {
  return { type: MSG_RECV, data: { msg, userid } };
}

function msgRead(from, userid, num) {
  return { type: MSG_READ, data: { from, userid, num } };
}

export function readMsg(from) {
  return (dispatch, getState) => {
    console.log(from, getState());
    Axios.post("/user/readmsg", { from }).then(res => {
      const userid = getState().user._id;
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgRead(from, userid, res.data.num));
      }
    });
  };
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on("recvmsg", function(data) {
      const userid = getState().user._id;
      dispatch(msgRecv(data, userid));
    });
  };
}

export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit("sendmsg", { from, to, msg });
  };
}

export function getMsgList() {
  return (dispatch, getState) => {
    Axios.get("/user/getmsglist").then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id;
        dispatch(msgList(res.data.msgs, res.data.users, userid));
      }
    });
  };
}
