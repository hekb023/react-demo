import React, { Component } from "react";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/user.redux";
import Logo from "../../component/logo/logo";

@connect(
  state => state.user,
  { login }
)
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      pwd: ""
    };

    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  handleRegister() {
    this.props.history.push("/register");
  }

  handleLogin() {
    this.props.login(this.state);
  }

  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <h2 style={{ textAlign: "center" }}>我是登录页面</h2>
        <WingBlank>
          <List>
            {this.props.msg ? (
              <p className="error-msg">{this.props.msg}</p>
            ) : null}
            <InputItem onChange={v => this.handleChange("user", v)}>
              用户
            </InputItem>
            <InputItem type="password" onChange={v => this.handleChange("pwd", v)}>
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type="primary">
            登录
          </Button>
          <WhiteSpace />
          <Button onClick={this.handleRegister} type="primary">
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
