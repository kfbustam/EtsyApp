import React, { Component } from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnSignUpPage: false,
    };
  }

  render() {
    const { pageView } = this.props;
    const { isOnSignUpPage, messages } = this.state;
    const onMessageUpdated = (newMessages) => {
      this.setState({ messages: newMessages });
    };
    const onSignUpButtonClicked = (isOnSignUpPageFlag) => {
      this.setState({ isOnSignUpPage: isOnSignUpPageFlag });
    };
    const { isAuthenticated } = this.props;
    const authComponent = isOnSignUpPage ? (
      <SignUp
        onMessageUpdated={onMessageUpdated}
        onSignUpButtonClicked={onSignUpButtonClicked}
      />
    ) : (
      <Login
        messages={messages}
        onSignUpButtonClicked={onSignUpButtonClicked}
      />
    );
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
        {isAuthenticated && <Header />}
        {isAuthenticated ? defaultComponent : authComponent}
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
});

Dashboard.defaultProps = {
  isAuthenticated: PropTypes.bool,
  pageView: PropTypes.string,
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
  pageView: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
