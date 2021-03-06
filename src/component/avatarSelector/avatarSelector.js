import React, { Component } from "react";
import { Grid, List } from "antd-mobile";
import PropTypes from 'prop-types'

class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      icon: ""
    };
  }

  render() {
    const avatarList = "boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra"
      .split(",")
      .map(v => ({ icon: require(`../img/${v}.png`), text: v }));
    const gridHeader = this.state.icon ? (
      <div>
        <span>已选中头像</span>
        <img style={{ width: "20px" }} src={this.state.icon} alt="" />
      </div>
    ) : (
      <div>请选择头像</div>
    );
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={el => {
              this.setState({ icon: el.icon });
              this.props.selectAvatar(el.text);
            }}
          />
        </List>
      </div>
    );
  }
}

export default AvatarSelector;
