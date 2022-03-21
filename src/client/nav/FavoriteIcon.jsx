import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Heart } from 'react-bootstrap-icons';
import { changePageView as changeCurrentViewAction } from '../store/actions/pageAction';

const navBarButtonStyle = {
  margin: 'auto'
};


// eslint-disable-next-line react/prefer-stateless-function
class FavoriteIcon extends Component {
  render() {
    return (
      <div style={navBarButtonStyle}>
        <Heart />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  changeCurrentView: newPage => dispatch(changeCurrentViewAction(newPage))
});

FavoriteIcon.defaultProps = {
  changeCurrentView: PropTypes.func
};

FavoriteIcon.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  changeCurrentView: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteIcon);
