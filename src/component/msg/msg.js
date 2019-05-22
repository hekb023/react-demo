import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";

@connect(state => state)
class Msg extends Component {
  constructor(props) {
    super(props);

    this.getLastItem = this.getLastItem.bind(this);
  }

  getLastItem(arr) {
    return arr[arr.length - 1];
  }

  render() {
    const userid = this.props.user._id;
    const userinfo = this.props.chat.users;

    const Item = List.Item;
    const Brief = Item.Brief;
    const msgGroup = {};
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    });
    const chartList = Object.values(msgGroup);

    const sortList = chartList.sort(function(a, b) {
      return b[b.length - 1].create_time - a[a.length - 1].create_time;
    });
    console.log(sortList);
    return (
      <div>
        <List>
          {sortList.map(v => {
            const lastItem = this.getLastItem(v);
            const targetId = v[0].from === userid ? v[0].to : v[0].from;
            const unreadNum = v.filter(item => !item.read && item.to === userid)
              .length;
            const name = userinfo[targetId] && userinfo[targetId].name;
            const avatar = userinfo[targetId] && userinfo[targetId].avatar;
            return (
              <Item
                key={lastItem._id}
                thumb={require(`../img/${avatar}.png`)}
                extra={<Badge text={unreadNum} />}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`);
                }}
              >
                {lastItem.content}
                <Brief>{name}</Brief>
              </Item>
            );
          })}
        </List>
      </div>
    );
  }
}

export default Msg;
