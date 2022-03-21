import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CaretDownFill, PersonCircle } from 'react-bootstrap-icons';
import { changePageView as changePageViewAction } from '../store/actions/pageAction';
import { PAGES } from '../store/actions/actionTypes';

const headerButtonStyle = {
  flexDirection: 'row',
  margin: 'auto'
};


// eslint-disable-next-line react/prefer-stateless-function
class ProfileIcon extends Component {
  render() {
    const onProfileClicked = () => {
      const { changePageView } = this.props;
      changePageView(PAGES.PROFILE);
    };

    return (
      <div style={headerButtonStyle} onClick={onProfileClicked} onKeyPress={onProfileClicked} role="button" tabIndex="-1" >
        <PersonCircle />
        <CaretDownFill />
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
};

ProfileIcon.propTypes = {
  changePageView: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIcon);
