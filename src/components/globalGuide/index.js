import React from 'react';
import { translate } from 'react-i18next';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
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
    if (mobileChecker.isMobileOrTablet) {
      const actions = [
        <FlatButton
          label={this.props.t('CLOSE')}
          primary={true}
          keyboardFocused={true}
          onClick={this.closePopup}
        />
      ];
      return (
        <div>
          <Dialog
            title={this.props.t('NOTE')}
            actions={actions}
            modal={false}
            open={!this.state.closeGuide}
          >
            {this.props.t('Experimental better on laptop')}
          </Dialog>
        </div>
      );
    }
    return (
      <div className="frame-guide">
        <a className="browser-guide-text">{this.props.t('Google Chrome get best experimental for the app.')}</a>
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