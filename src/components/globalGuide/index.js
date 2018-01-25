import React from 'react';
import { translate } from 'react-i18next';
import { getItem, setItem } from '../../utils';
import browserInformation from './browserInformation';
import mobileChecker from './mobileChecker';

import './styles.scss';

class GlobalGuide extends React.PureComponent {
  constructor(props) {
    super(props);
    let closeGuide = getItem('closeGuide') || browserInformation.isChrome;
    if (mobileChecker.isMobileOrTablet) {
      closeGuide = false;
    }
    this.state = {
      closeGuide,
    };
    this.closePopup = this.closePopup.bind(this);
    this.closeGuideBanner = this.closeGuideBanner.bind(this);
  }
  closeGuideBanner() {
    setItem('closeGuide', true);
    this.setState({
      closeGuide: true,
    });
  }
  closePopup() {
    this.setState({
      closeGuide: true,
    });
  }
  getText() {
    let textWarning = 'Google Chrome get best experimental for the app.';
    if (mobileChecker.isMobileOrTablet) {
      textWarning = 'Experimental better on laptop';
    }
    return (
      <div className="frame-guide">
        <a className="browser-guide-text">{this.props.t(textWarning)}</a>
        <span className="browser-guide-close" onClick={this.closeGuideBanner}/>
      </div>
    );
  }
  render() {
    if (this.state.closeGuide) {
      return null;
    }
    return this.getText();
  }
}

export default translate('translations')(GlobalGuide);