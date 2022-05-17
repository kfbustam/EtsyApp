import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dropdown } from 'react-bootstrap';
import { CaretDownFill, PersonCircle } from 'react-bootstrap-icons';
import { changePageView as changePageViewAction } from '../store/actions/pageAction';
import { PAGES } from '../store/actions/actionTypes';

const headerButtonStyle = {
  flexDirection: 'row',
  margin: 'auto'
};

const signInStyle = {
  color: 'black',
};

// eslint-disable-next-line react/prefer-stateless-function
class ProfileIcon extends Component {
  render() {
    const { changePageView, isAuthenticated } = this.props;
    const onProfileClicked = () => {
      changePageView(PAGES.PROFILE);
    };
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <Button
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        style={signInStyle}
        variant="link"
      >
        {children}
      </Button>
    ));

    const onSignUpClick = () => {
      changePageView(PAGES.SIGN_UP);
    };

    const onSignInClicked = () => {
      changePageView(PAGES.LOGIN);
    };

    const onLogoutClicked = () => {
      localStorage.removeItem('jwtToken');
      window.location.reload();
    };

    return (
      <div style={headerButtonStyle} role="button" tabIndex="-1">
        {
          isAuthenticated
            ? (
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  <PersonCircle />
                  <CaretDownFill />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="viewprofile" onClick={onProfileClicked} onKeyPress={onProfileClicked}>
                    View Profile
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="signout" onClick={onLogoutClicked} onKeyPress={onLogoutClicked}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
            : (
              <Button onClick={onSignInClicked} onKeyPress={onSignInClicked} style={{ color: 'black' }} variant="link">Sign In</Button>
            )
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  changePageView: userLoginDetails => dispatch(changePageViewAction(userLoginDetails))
});

ProfileIcon.defaultProps = {
  changePageView: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

ProfileIcon.propTypes = {
  changePageView: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIcon);
