import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogoutRequest as userLogoutRequestAction } from '../store/actions/userAction';
import NavBar from './NavBar';
import CategoryBar from './CategoryBar';

const headerButtonStyle = {
  display: 'flex',
  flexDirection: 'column',
};


// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {
  render() {
    // const onLogoutClicked = () => {
    //   const { userLogoutRequest } = this.props;
    //   userLogoutRequest();
    // };

    return (
      <div style={headerButtonStyle}>
        <NavBar />
        <CategoryBar />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  userLogoutRequest: userLoginDetails => dispatch(userLogoutRequestAction(userLoginDetails))
});

Header.defaultProps = {
  userLogoutRequest: PropTypes.func
};

Header.propTypes = {
  userLogoutRequest: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
