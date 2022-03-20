import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CaretDownFill, PersonCircle } from 'react-bootstrap-icons';
import { changePageView } from '../store/actions/pageAction';

const headerButtonStyle = {
  display: 'flex',
  flexDirection: 'row',
  margin: 'auto 0 13px'
};


// eslint-disable-next-line react/prefer-stateless-function
class ProfileIcon extends Component {
  render() {
    const onProfileClicked = () => {
      const { changeCurrentView } = this.props;
      changeCurrentView();
    };

    return (
      <div style={headerButtonStyle}>
        <PersonCircle />
        <CaretDownFill />
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

ProfileIcon.defaultProps = {
  changeCurrentView: PropTypes.func
};

ProfileIcon.propTypes = {
  changeCurrentView: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIcon);
