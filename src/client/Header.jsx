import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogoutRequest as userLogoutRequestAction } from './store/actions/userAction';

const headerButtonStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 20,
};


// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {
  render() {
    const onLogoutClicked = () => {
      const { userLogoutRequest } = this.props;
      userLogoutRequest();
    };

    return (
      <div style={headerButtonStyle}>
        <h3>Book Store App</h3>
        <div>
          <button type="submit" className="btn btn-primary" onClick={onLogoutClicked}>Logout</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
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
