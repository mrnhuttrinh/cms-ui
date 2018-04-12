import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchField from '../commons/search';
import ReportReducer from './reducers';
import * as actions from './actions';
import { TYPE } from '../commons/table';
import { ContentWrapper } from '../commons';
import { translate } from 'react-i18next';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';
import { Tab } from 'material-ui/Tabs';
import { TabTemplate } from '../commons';
import MerchantStatmentList, { reducers as MerchantStatementsListReducer } from './merchantStatementList';

import './styles.scss';

const tabStyle = {
  backgroundColor: 'rgb(128, 203, 196)',
  minHeight: 'calc(100% - 56px)',
  position: 'relative',
};

const indicatorStyle = {
  backgroundColor: '#009688'
};


const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

const rows = [
  {
    text: 'The number of customer has been',
    key: 'customer',
  },
  {
    text: 'The number of account has been',
    key: 'account',
  },
  {
    text: 'The number of card has been',
    key: 'card',
  },
  {
    text: 'The number of wallet has been',
    key: 'wallet',
  },
  {
    text: 'The number of user has been',
    key: 'user',
  },
];

class Report extends React.Component {
  constructor() {
    super();
    this.refreshData = this.refreshData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  handleSearchChange(search) {
    // Trim value
    _.forIn(search, function(value, key) {
      if (typeof value === 'string') {
        search[key] = value.trim();
      }
    });
    this.props.actions.getReport(search);
  }
  refreshData() {
    this.props.actions.getReport(this.props.search);
  }
  renderDetail() {
    return _.map(rows, (r, idx) => (
      <div key={idx} style={{paddingTop: '30px', textAlign: 'left'}}>
          <span style={titleStyle}>{this.props.t(r.text)}</span>
          <GridList
            cols={8}
            padding={5}
            cellHeight={56}
          >
            <TextField
              floatingLabelText={this.props.t('created')}
              value={_.get(this.props.data, `${r.key}.create`, 'N/A')}
              floatingLabelFixed
              readOnly
              cols={2}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('locked')}
              value={_.get(this.props.data, `${r.key}.lock`, 'N/A')}
              floatingLabelFixed
              readOnly
              cols={2}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('unlocked')}
              value={_.get(this.props.data, `${r.key}.unLock`, 'N/A')}
              floatingLabelFixed
              readOnly
              cols={2}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('deleted')}
              value={_.get(this.props.data, `${r.key}.remove`, 'N/A')}
              floatingLabelFixed
              readOnly
              cols={2}
              fullWidth
            />
          </GridList>
        </div>));
  }
  render() {
    return (
      <ContentWrapper
        title="Report"
        iconStyleLeft={{display: 'none'}}
      >
        <TabTemplate
          inkBarStyle={indicatorStyle}
        >
          <Tab style={tabStyle} label={this.props.t('Synthesis Report')} >
            <div className="report-wrapper">
              <SearchField
                columns={this.props.columns}
                search={this.props.search}
                onChange={this.handleSearchChange}
                hideLabel
                firstChild
              />
              {this.renderDetail()}
            </div>
          </Tab>
          <Tab style={tabStyle} label={this.props.t('Merchants Report')} >
            <div>
              <MerchantStatmentList />
            </div>
          </Tab>
        </TabTemplate>
      </ContentWrapper>
    );
  }
}

Report.defaultProps = {
  columns: [
    {
      key: 'date',
      text: 'Date',
      type: TYPE.date,
    }
  ],
  search: {
    key: 'date',
  },
  data: null,
  size: 10,
};

const mapStateToProps = (state) => ({
  search: state.ReportReducer.get('search'),
  data: state.ReportReducer.get('data'),
  requesting: state.ReportReducer.get('requesting'),
  error: state.ReportReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Report));

export const reducers = {
  ReportReducer,
  ...MerchantStatementsListReducer,
};
