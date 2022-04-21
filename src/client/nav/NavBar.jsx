import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogoutRequest as userLogoutRequestAction } from '../store/actions/userAction';
import EtsyLogo from './EtsyLogo';
import Search from '../Search';
import FavoriteIcon from './FavoriteIcon';
import ProfileIcon from './ProfileIcon';
import ShopIcon from './ShopIcon';
import CartIcon from './CartIcon';

const navBarStyle = {
  display: 'flex',
  flexDirection: 'row',
  height: '50px',
};

const iconsStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  width: '15%'
};

// eslint-disable-next-line react/prefer-stateless-function
class NavBar extends Component {
  render() {
    return (
      <div style={navBarStyle}>
        <EtsyLogo />
        <Search />
        <div style={iconsStyle}>
          <FavoriteIcon />
          <ShopIcon />
          <ProfileIcon />
          <CartIcon />
        </div>
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

NavBar.defaultProps = {
  userLogoutRequest: PropTypes.func
};

NavBar.propTypes = {
  userLogoutRequest: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
