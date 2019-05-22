import React, { Component } from "react";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/user.redux";
import Logo from "../../component/logo/logo";
import imoocForm from '../../component/imooc-form/imooc-form'

// function WrapperHello(Comp) {
//   // 反向继承
//   class WrapComp extends Comp {
//     // 可以增加生命周期
//     componentDidMount() {
//       console.log("反向继承时增加的生命周期。。。");
//     }

//     render() {
//       return <Comp />;
//     }
//   }

//   // 属性代理
//   class WrapComp extends Component {
//     render() {
//       return (
//         <div>
//           <p>这里是HOC高阶组件特有的原生</p>
//           {/* 可以任意增加属性 */}
//           <Comp name="title" {...this.props} />
//         </div>
//       );
//     }
//   }

//   return WrapComp;
// }

// @WrapperHello
// class Hello extends Component {
//   render() {
//     return <h2>hello imooc I love react</h2>;
//   }
// }

@connect(
  state => state.user,
  { login }
)
@imoocForm
class Login extends Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleRegister() {
    this.props.history.push("/register");
  }

  handleLogin() {
    this.props.login(this.props.state);
  }

  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== "/login" ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <Logo />
        <h2 style={{ textAlign: "center" }}>我是登录页面</h2>
        <WingBlank>
          <List>
            {this.props.msg ? (
              <p className="error-msg">{this.props.msg}</p>
            ) : null}
            <InputItem onChange={v => this.props.handleChange("user", v)}>
              用户
            </InputItem>
            <InputItem
              type="password"
              onChange={v => this.props.handleChange("pwd", v)}
            >
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
