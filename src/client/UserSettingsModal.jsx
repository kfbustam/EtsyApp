import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { toggleModal as toggleModalAction } from './store/actions/pageAction';
import { updateUserInfo as updateUserInfoAction } from './store/actions/userAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TOGGLE_USER_SETTINGS_MODAL } from './store/actions/actionTypes';

const modalBodyStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly'
};

const CURRENCIES = [
  '$ United States Dollar (USD)',
  '$ Canadian Dollar (CAD)',
];

const LANGUAGES = [
  'Deutsch',
  'English (UK)',
  'English (US)',
  'Español',
];

const REGIONS = [
  'United States',
  'United Kingdom',
  'Spain'
];

class UserSettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: 'United States',
      language: 'English',
      currency: 'United States Dollar (USD)',
    };
  }

  onModalClose = () => {
    const { toggleModal } = this.props;
    toggleModal(false);
  }

  onRegionSelect = (region) => {
    this.setState({ region });
  }

  onLanguageSelect = (language) => {
    this.setState({ language });
  }

  onCurrencySelect = (currency) => {
    this.setState({ currency });
  }

  onSaveSettings = () => {
    const { updateUserInfo } = this.props;
    const {
      region,
      language,
      currency
    } = this.state;
    updateUserInfo({ currency, language, region });
    this.onModalClose();
  }

  render() {
    const { showUserSettingsModal } = this.props;
    const {
      region: currRegion,
      language: currLanguage,
      currency: currCurrency
    } = this.state;
    return (
      <Modal show={showUserSettingsModal ?? false} onHide={this.onModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>Set where you live, what language you speak, and the currency you use.</>
          <br />
          <br />
          <DropdownButton
            alignRight
            title={currRegion}
            id="dropdown-menu-align-right"
            onSelect={this.onRegionSelect}
          >
            {REGIONS.map(region => <Dropdown.Item eventKey={region}>{region}</Dropdown.Item>)}
          </DropdownButton>
          <br />
          <DropdownButton
            alignRight
            title={currLanguage}
            id="dropdown-menu-align-right"
            onSelect={this.onLanguageSelect}
          >
            {LANGUAGES.map(language => <Dropdown.Item eventKey={language}>{language}</Dropdown.Item>)}
          </DropdownButton>
          <br />
          <DropdownButton
            alignRight
            title={currCurrency}
            id="dropdown-menu-align-right"
            onSelect={this.onCurrencySelect}
          >
            {CURRENCIES.map(currency => <Dropdown.Item eventKey={currency}>{currency}</Dropdown.Item>)}
          </DropdownButton>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.onModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.onSaveSettings}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  showUserSettingsModal: state.pages.showUserSettingsModal
});

const mapDispatchToProps = dispatch => ({
  toggleModal: showModal => dispatch(toggleModalAction(showModal, TOGGLE_USER_SETTINGS_MODAL)),
  updateUserInfo: userInfo => dispatch(updateUserInfoAction(userInfo))
});

UserSettingsModal.defaultProps = {
  showUserSettingsModal: PropTypes.bool,
  toggleModal: PropTypes.bool,
  updateUserInfo: PropTypes.func,
};

UserSettingsModal.propTypes = {
  showUserSettingsModal: PropTypes.bool,
  toggleModal: PropTypes.bool,
  updateUserInfo: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsModal);
