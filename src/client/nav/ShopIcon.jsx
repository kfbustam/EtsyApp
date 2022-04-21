import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Shop } from 'react-bootstrap-icons';
import { changePageView as changePageViewAction } from '../store/actions/pageAction';
import { PAGES } from '../store/actions/actionTypes';

const headerButtonStyle = {
  flexDirection: 'row',
  margin: 'auto'
};


// eslint-disable-next-line react/prefer-stateless-function
class ShopIcon extends Component {
  render() {
    const onShopIconClick = () => {
      const { changePageView } = this.props;
      changePageView(PAGES.SHOP_HOME);
    };

    return (
      <div style={headerButtonStyle} onClick={onShopIconClick} onKeyPress={onShopIconClick} role="button" tabIndex="-1">
        <Shop />
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

ShopIcon.defaultProps = {
  changePageView: PropTypes.func,
};

ShopIcon.propTypes = {
  changePageView: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopIcon);
