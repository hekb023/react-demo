import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Result, List, WhiteSpace, Modal } from "antd-mobile";
import browserCookie from "browser-cookies";
import { logutCommit } from "../../redux/user.redux";

@connect(
  state => state.user,
  { logutCommit }
)
class User extends Component {
  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    const alert = Modal.alert;
    return props.user ? (
      <div>
        <Result
          img={
            <img
              src={require(`../img/${this.props.avatar}.png`)}
              alt=""
              style={{ width: 50 }}
            />
          }
          title={props.user}
          message={props.type === "boss" ? props.company : null}
        />
        <List renderHeader={() => "简介"}>
          <Item multipleLine>
            {props.title}
            {props.desc.split("\n").map(v => (
              <Brief key={v}>{v}</Brief>
            ))}
            {props.money ? <Brief>薪资：{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item
            onClick={() =>
              alert("注销", "确认退出登录吗？", [
                { text: "取消", onPress: () => console.log("cancel") },
                {
                  text: "确定",
                  onPress: () => {
                    browserCookie.erase("userid");
                    // this.props.history.push("/login");
                    this.props.logutCommit();
                  }
                }
              ])
            }
          >
            退出登录
          </Item>
        </List>
      </div>
    ) : props.redirectTo ? (
      <Redirect to={props.redirectTo} />
    ) : null;
  }
}

export default User;
