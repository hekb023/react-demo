import React, { Component } from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector.js'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {update}
)
class Bossinfo extends Component {
  constructor(props) {
    super(props);
    this.state={
      avatar: '',
      title:'',
      company: '',
      money:'',
      desc:''
    }
  }

  onChange(key,val){
    this.setState({
      [key]:val
    })
  }

  render() {
    const path = this.props.location.pathname;
    return (
      <div>
        {this.props.redirectTo&&this.props.redirectTo!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar mode="dark">BOSS完善信息页面</NavBar>
        <AvatarSelector selectAvatar={(name)=>{
          this.setState({
            avatar:name
          })
        }}></AvatarSelector>
        <InputItem onChange={v=>{this.onChange('title',v)}}>招聘职位</InputItem>
        <InputItem onChange={v=>{this.onChange('company',v)}}>公司名称</InputItem>
        <InputItem onChange={v=>{this.onChange('money',v)}}>职位薪资</InputItem>
        <TextareaItem onChange={v=>{this.onChange('desc',v)}} title="职位要求" rows={3} autoHeight></TextareaItem>
        <Button type="primary" onClick={()=>{this.props.update(this.state)}}>保存</Button>
      </div>
    );
  }
}

export default Bossinfo;