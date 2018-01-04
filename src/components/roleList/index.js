import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RoleListReducer from './reducers';
import * as actions from './actions';
import DataTable, { dataAccesser, TYPE } from '../commons/table';
import { ContentWrapper } from '../commons';
import { translate } from 'react-i18next';

class RoleList extends React.Component {
  constructor() {
    super();
    this.handleCellClick = this.handleCellClick.bind(this);
  }
  handleCellClick(indexRow, column, event) {
    this.props.history.push(`/role/${dataAccesser(this.props.data)[indexRow].id}`);
  }
  render() {
    return (
      <ContentWrapper
        title="Role list"
        iconStyleLeft={{display: 'none'}}
      >
        <DataTable
          columns={this.props.columns}
          sort={this.props.sort}
          data={this.props.data}
          handleCellClick={this.handleCellClick}
          size={this.props.size}
          search={this.props.search}
          dataAccesser={this.props.dataAccesser}
          pageAccesser={this.props.pageAccesser}
          getData={this.props.actions.getRoleList}
          requesting={this.props.requesting}
          style={{
            height: 'calc(100% - 56px)',
            display: 'block',
          }}
        />
      </ContentWrapper>
    );
  }
}

RoleList.defaultProps = {
  columns: [
    {
      key: 'name',
      text: 'Role Name',
      sort: 'ASC',
      formater: (data, t) => {
        return t(data.name);
      },
    },
    {
      key: 'createdAt',
      text: 'Created date',
      type: TYPE.date,
    },
  ],
  sort: {
    key: 'name',
    type: 'ASC',
  },
  data: null,
  size: 10,
  search: {
    key: 'name',
  },
}

const mapStateToProps = (state) => ({
  page: state.RoleListReducer.get('page'),
  sort: state.RoleListReducer.get('sort'),
  search: state.RoleListReducer.get('search'),
  data: state.RoleListReducer.get('data'),
  requesting: state.RoleListReducer.get('requesting'),
  error: state.RoleListReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate('translations')(RoleList));

export const reducers = {
  RoleListReducer,
}