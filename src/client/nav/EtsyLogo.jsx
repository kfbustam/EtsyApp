import React, { Component } from 'react';
import etsyLogo from '../../../public/Etsy_logo.svg.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changePageView as changePageViewAction } from '../store/actions/pageAction';
import { PAGES } from '../store/actions/actionTypes';

const iconStyle = {
  height: 30,
  width: 60,
};

const rootStyle = {
  margin: 'auto 6px',
};

// eslint-disable-next-line react/prefer-stateless-function
class EtsyLogo extends Component {
  render() {
    const {changePageView} = this.props;

    return (
      <div style={rootStyle} onClick={() => changePageView(PAGES.HOME)} onKeyPress={() => changePageView(PAGES.HOME)} role="button" tabIndex="-1" >
        <img style={iconStyle} src={etsyLogo} alt="Logo" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  changePageView: userLoginDetails => dispatch(changePageViewAction(userLoginDetails))
});

EtsyLogo.defaultProps = {
};

EtsyLogo.propTypes = {
};


export default connect(mapStateToProps, mapDispatchToProps)(EtsyLogo);

