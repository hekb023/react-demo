import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import { register } from "../../redux/user.redux";
import {
  WingBlank,
  List,
  InputItem,
  Button,
  Radio,
  WhiteSpace
} from "antd-mobile";
import Logo from "../../component/logo/logo";
@connect(
  state => state.user,
  { register }
)
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      pwd: "",
      repeatpwd: "",
      type: "genius" // 或者boss
    };

    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  handleRegister() {
    this.props.register(this.state);
  }

  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? (
              <p className="error-msg">{this.props.msg}</p>
            ) : null}
            <InputItem onChange={v => this.handleChange("user", v)}>
              用户名
            </InputItem>
            <InputItem onChange={v => this.handleChange("pwd", v)}>
              密码
            </InputItem>
            <InputItem onChange={v => this.handleChange("repeatpwd", v)}>
              确认密码
            </InputItem>
          </List>
          <WhiteSpace />
          <List>
            <RadioItem
              checked={this.state.type === "genius"}
              onChange={v => this.handleChange("type", "genius")}
            >
              牛人
            </RadioItem>
            <RadioItem
              checked={this.state.type === "boss"}
              onChange={v => this.handleChange("type", "boss")}
            >
              BOSS
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
