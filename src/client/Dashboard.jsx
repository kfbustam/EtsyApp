import React, { Component } from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import UserSettingsModal from './UserSettingsModal';
import Home from './Home';
import Header from './nav/Header';
import Login from './Login';
import Profile from './Profile';
import Favorite from './Favorites';
import SellOnEtsy from './SellOnEtsy';
import ShopHome from './ShopHome';
import Cart from './Cart';
import PurchaseHistory from './PurchaseHistory';
import ShoppingItemOverview from './ShoppingItemOverview';
import SignUp from './SignUp';
import SearchLanding from './SearchLanding';
import { PAGES } from './store/actions/actionTypes';
import { changePageView as changePageViewAction } from './store/actions/pageAction';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnSignUpPage: false,
    };
  }

  render() {
    const { changePageView, pageView } = this.props;
    const { isOnSignUpPage, messages } = this.state;
    const onMessageUpdated = (newMessages) => {
      this.setState({ messages: newMessages });
    };
    const onSignUpButtonClicked = (isOnSignUpPageFlag) => {
      changePageView(PAGES.SIGN_UP);
      this.setState({ isOnSignUpPage: isOnSignUpPageFlag });
    };
    let defaultComponent;

    switch (pageView) {
      case 'SEARCH_LANDING':
        defaultComponent = (
          <SearchLanding />
        );
        break;
      case 'PROFILE':
        defaultComponent = (
          <Profile />
        );
        break;
      case 'FAVORITES':
        defaultComponent = (
          <Favorite />
        );
        break;
      case 'SELL_ON_ETSY':
        defaultComponent = (
          <SellOnEtsy />
        );
        break;
      case 'SHOP_HOME':
        defaultComponent = (
          <ShopHome />
        );
        break;
      case 'CART':
        defaultComponent = (
          <Cart />
        );
        break;
      case 'MY_PURCHASES':
        defaultComponent = (
          <PurchaseHistory />
        );
        break;
      case 'SHOPPING_ITEM_OVERVIEW':
        defaultComponent = (
          <ShoppingItemOverview />
        );
        break;
      default:
        defaultComponent = <Home />;
        break;
    }
    return (
      <SSRProvider>
        <Header />
        <Modal show={pageView === 'SIGN_UP' || pageView === 'LOGIN'}>
          <Modal.Header closeButton onHide={() => changePageView(PAGES.HOME)}>
            <Modal.Title>Sign in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              pageView === 'SIGN_UP'
                ? (
                  <SignUp
                    onMessageUpdated={onMessageUpdated}
                  />
                )
                : (
                  <Login
                    messages={messages}
                    onSignUpButtonClicked={onSignUpButtonClicked}
                  />
                )
            }
          </Modal.Body>
        </Modal>
        {defaultComponent}
        <UserSettingsModal />
      </SSRProvider>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  pageView: state.page.pageView,
});

const mapDispatchToProps = dispatch => ({
  changePageView: userLoginDetails => dispatch(changePageViewAction(userLoginDetails))
});

Dashboard.defaultProps = {
  changePageView: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  pageView: PropTypes.string,
};

Dashboard.propTypes = {
  changePageView: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  pageView: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
