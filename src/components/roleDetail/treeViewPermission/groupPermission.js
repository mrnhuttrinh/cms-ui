import React from 'react';
import { translate } from 'react-i18next';
import {ListItem} from 'material-ui/List';
import _ from 'lodash';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

import {
  itemEvent
} from './styles';

class GroupPermission extends React.Component {
  renderChildList(disabled) {
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
          primaryText={this.props.t(per.displayName)}
          leftCheckbox={
            <Checkbox
              onCheck={(event, isInputChecked) => this.props.handleCheckbox(isInputChecked, [per])}
              checked={itemChecked || false}
              disabled={disabled}
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
      disabled,
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
          primaryText={this.props.t(groupName)}
          leftCheckbox={
            <Checkbox
              onCheck={(event, isInputChecked) => this.props.handleCheckbox(isInputChecked, nestedItems)}
              checked={this.checkboxChecked()}
              disabled={disabled}
            />
          }
          nestedItems={this.renderChildList(disabled)}
        />
        <Divider />
      </React.Fragment>
    )
  }
}

export default translate('translations')(GroupPermission);
