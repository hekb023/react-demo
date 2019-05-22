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
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
  state => state.user,
  { register }
)
@imoocForm
class Register extends Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount(){
    this.props.handleChange('type','genius')
  }

  handleRegister() {
    this.props.register(this.props.state);
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
            <InputItem onChange={v => this.props.handleChange("user", v)}>
              用户名
            </InputItem>
            <InputItem onChange={v => this.props.handleChange("pwd", v)}>
              密码
            </InputItem>
            <InputItem onChange={v => this.props.handleChange("repeatpwd", v)}>
              确认密码
            </InputItem>
          </List>
          <WhiteSpace />
          <List>
            <RadioItem
              checked={this.props.state.type === "genius"}
              onChange={v => this.props.handleChange("type", "genius")}
            >
              牛人
            </RadioItem>
            <RadioItem
              checked={this.props.state.type === "boss"}
              onChange={v => this.props.handleChange("type", "boss")}
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
