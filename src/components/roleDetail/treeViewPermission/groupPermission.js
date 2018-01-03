import React from 'react';
import {ListItem} from 'material-ui/List';
import _ from 'lodash';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

import {
  itemEvent
} from './styles';

class GroupPermission extends React.Component {
  renderChildList() {
    const {
      nestedItems,
      checkedList,
      index,
    } = this.props;
    const style = index % 2 === 0 ? itemEvent : {};
    return _.map(nestedItems, per => {
      const itemChecked = _.find(checkedList, item => item.id === per.id);
      return (
        <ListItem
          key={per.id}
          style={style}
          primaryText={per.displayName}
          leftCheckbox={
            <Checkbox
              onCheck={(event, isInputChecked) => this.props.handleCheckbox(isInputChecked, [per])}
              checked={itemChecked || false}
            />
          }
        />
      )
    });
  }
  checkboxChecked() {
    const {
      nestedItems = [],
      checkedList = []
    } = this.props;
    return nestedItems.length === checkedList.length ? true : false;
  }
  render() {
    const {
      nestedItems,
      groupName,
      index,
    } = this.props;
    const style = index % 2 === 0 ? itemEvent : {};
    return (
      <React.Fragment>
        <ListItem
          style={style}
          nestedListStyle={Object.assign({}, style, {
            paddingLeft: 35,
            borderTop: '1px solid rgb(224, 224, 224)',
          })}
          primaryText={groupName}
          leftCheckbox={
            <Checkbox
              onCheck={(event, isInputChecked) => this.props.handleCheckbox(isInputChecked, nestedItems)}
              checked={this.checkboxChecked()}
            />
          }
          nestedItems={this.renderChildList()}
        />
        <Divider />
      </React.Fragment>
    )
  }
}

export default GroupPermission;
