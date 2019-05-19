import React, { Component } from "react";
import propTypes from "prop-types";
import { Card, WhiteSpace, WingBlank } from "antd-mobile";

class UserCard extends Component {
  static propTypes = {
    userList: propTypes.array.isRequired
  };

  render() {
    return (
      <WingBlank>
        <WhiteSpace />
        {this.props.userList.map(v =>
          v.avatar ? (
            <div key={v.user}>
              <Card>
                <Card.Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                />
                <Card.Body>
                  {v.type === "boss" ? <div>公司：{v.company}</div> : null}
                  {v.desc.split("\n").map(n => (
                    <div key={n}>{n}</div>
                  ))}
                  {v.type === "boss" ? <div>薪资：{v.money}</div> : null}
                </Card.Body>
              </Card>
              <WhiteSpace />
            </div>
          ) : null
        )}
      </WingBlank>
    );
  }
}

export default UserCard;
