import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleModal as toggleModalAction } from './store/actions/pageAction';
import { TOGGLE_USER_SETTINGS_MODAL } from './store/actions/actionTypes';

const rootStyle = {
  display: 'flex',
  flexDirection: 'row',
  margin: '0px 0px 10px 10px'
};

const footerButtonContainerStyle = {

};

// eslint-disable-next-line react/prefer-stateless-function
class Footer extends Component {
  render() {
    const { toggleModal, user } = this.props;
    const { region, currency, language } = user;
    return (
      <div style={rootStyle}>
        <div style={footerButtonContainerStyle} onClick={() => toggleModal(true)} onKeyPress={() => toggleModal(true)} role="button" tabIndex="-1">
          {region}
          {' '}
          |
          {' '}
          {language}
          {' '}
          |
          {' '}
          {currency}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  toggleModal: showModal => dispatch(toggleModalAction(showModal, TOGGLE_USER_SETTINGS_MODAL))
});

Footer.defaultProps = {
  toggleModal: PropTypes.func,
  user: PropTypes.object,
};

Footer.propTypes = {
  toggleModal: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
