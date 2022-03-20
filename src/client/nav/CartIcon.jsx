import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Cart } from 'react-bootstrap-icons';
import { changePageView } from '../store/actions/pageAction';

const headerButtonStyle = {
  margin: 'auto',
};


// eslint-disable-next-line react/prefer-stateless-function
class CartIcon extends Component {
  render() {
    // const onLogoutClicked = () => {
    //   const { changeCurrentView } = this.props;
    //   changeCurrentView();
    // };

    return (
      <div style={headerButtonStyle}>
        <Cart />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  changeCurrentView: userLoginDetails => dispatch(changeCurrentViewAction(userLoginDetails))
});

CartIcon.defaultProps = {
  changeCurrentView: PropTypes.func
};

CartIcon.propTypes = {
  changeCurrentView: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
