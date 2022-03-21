import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Globe, PencilFill, Upload, FilterCircle
} from 'react-bootstrap-icons';
import Search from './Search';


const navBarStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%'
};

const leftStyle = {

};

const rightStyle = {

};

// eslint-disable-next-line react/prefer-stateless-function
class FavoriteItemsNavBar extends Component {
  render() {
    const privacy = 'public';

    return (
      <div style={navBarStyle}>
        <div style={leftStyle}>
          <div>Favorite Items</div>
          <Globe />
          <div>{privacy}</div>
          <PencilFill />
          <Upload />
        </div>
        <div style={rightStyle}>
          <Search placeholder="Search your favorites" />
          <FilterCircle />
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

FavoriteItemsNavBar.defaultProps = {
  userLogoutRequest: PropTypes.func
};

FavoriteItemsNavBar.propTypes = {
  userLogoutRequest: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteItemsNavBar);
