import React from 'react';
import { connect } from 'react-redux';
import MerchantStatementList from '../report/merchantStatementList';

class Report extends React.Component {
  render() {
    return (
      <MerchantStatementList merchantId={this.props.data.id}/>
    );
  }
}

const mapStateToProps = (state) => {
  const generalInformation = state.MerchantDetailReducer.get('generalInformation');
  return {
    requesting: generalInformation.get('requesting'),
    data: generalInformation.get('data'),
    error: generalInformation.get('error'),
  };
};


export default connect(
  mapStateToProps,
  null,
)(Report);
