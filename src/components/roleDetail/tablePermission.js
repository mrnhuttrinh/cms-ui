import React from 'react';
import { translate } from 'react-i18next';
import FlatButton from 'material-ui/FlatButton';
import DataTable, { dataAccesser } from '../commons/table';

import {
  groupControl,
  tablePermission,
} from './styles';

class TablePermission extends React.Component {
  render() {
    const {
      data: {
        permissions = []
      },
    } = this.props;
    return (
      <React.Fragment>
        <div style={groupControl}>
          <span style={tablePermission.title}>{this.props.t('Permission table')}</span>
          <FlatButton
            style={{
              boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
              float: 'right',
              marginLeft: 15,
              marginRight: 30,
              marginTop: 10,
              marginBottom: 10,
            }}
            backgroundColor="#009688"
            labelStyle={{color: '#fff'}}
            label={this.props.t('ADDED')}
          />
          <FlatButton
            style={{
              boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
              float: 'right',
              marginRight: 15,
              marginTop: 10,
              marginBottom: 10,
            }}
            backgroundColor="#b93221"
            labelStyle={{color: '#fff'}}
            onClick={this.onClickOpenDialog}
            label={this.props.t('DELETE')}
          />
        </div>
          <DataTable
            columns={this.props.columns}
            sort={this.props.sort}
            data={permissions}
            handleCellClick={this.handleCellClick}
            size={this.props.size}
            search={this.props.search}
            style={{
              display: 'block',
            }}
            getData={() => {}}
            dataAccesser={this.props.dataAccesser}
            pageAccesser={this.props.pageAccesser}
          />
      </React.Fragment>
    );
  }
}

TablePermission.defaultProps = {
  columns: [
    {
      key: 'name',
      text: 'Permission Name',
      sort: 'ASC',
    },
  ],
  size: 10,
  dataAccesser: (data) => (data),
  pageAccesser: (data) => ({
    first: true,
    last: true,
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalElements: 0,
    totalPages: 1,
  }),
}

export default translate('translations')(TablePermission);
