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
class Geniusinfo extends Component {
  constructor(props) {
    super(props);
    this.state={
      avatar: '',
      title:'',
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
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        <AvatarSelector selectAvatar={(name)=>{
          this.setState({
            avatar:name
          })
        }}></AvatarSelector>
        <InputItem onChange={v=>{this.onChange('title',v)}}>求职岗位</InputItem>
        <TextareaItem onChange={v=>{this.onChange('desc',v)}} title="职位要求" rows={3} autoHeight></TextareaItem>
        <Button type="primary" onClick={()=>{this.props.update(this.state)}}>保存</Button>
      </div>
    );
  }
}

export default Geniusinfo;