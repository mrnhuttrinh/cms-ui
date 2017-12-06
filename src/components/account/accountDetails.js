import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import AccoutDetailsComponent from './accountDetailsComponent';

const groupControl = {
  display: 'block',
  padding: '14px 33px 49px',
  backgroundColor: '#e8e8e8',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 4px 4px 0px, rgba(0, 0, 0, 0.12) 0px 0px 4px 0px'
}

class AccountDetails  extends React.Component  {
  renderCard() {
    return (
      <div
        style={{padding:'20px 100px 20px 100px'}}
      >
        <AccoutDetailsComponent account={this.props.account} />
      </div>);
  }
  render () {
    return (
      <div>
        <div style={groupControl}>
          <FlatButton
            style={{
              boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
              float: 'right',
              marginLeft: 15
            }}
            backgroundColor="#009688"
            labelStyle={{color: '#fff'}}
            label="CHỈNH SỬA"
          />
          <FlatButton
            style={{
              boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
              float: 'right',
              marginRight: 15,
            }}
            backgroundColor="#b93221"
            labelStyle={{color: '#fff'}}
            label="KHÓA TÀI KHOẢN"
          />
        </div>
        {this.props.account ? this.renderCard() : null}
      </div>);
  }
}

export default AccountDetails;
