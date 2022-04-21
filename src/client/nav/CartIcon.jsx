import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Cart } from 'react-bootstrap-icons';
import { changePageView as changeCurrentViewAction } from '../store/actions/pageAction';
import { PAGES } from '../store/actions/actionTypes';

const headerButtonStyle = {
  margin: 'auto',
};


// eslint-disable-next-line react/prefer-stateless-function
class CartIcon extends Component {
  render() {
    const { changeCurrentView } = this.props;

    return (
      <div style={headerButtonStyle}>
        <Cart onClick={() => changeCurrentView(PAGES.CART)} onKeyPress={() => changeCurrentView(PAGES.CART)} role="button" tabIndex="-1" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  changeCurrentView: page => dispatch(changeCurrentViewAction(page))
});

CartIcon.defaultProps = {
  changeCurrentView: PropTypes.func
};

CartIcon.propTypes = {
  changeCurrentView: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
