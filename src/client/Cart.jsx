import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import {
  hydrateCartItems as hydrateCartItemsAction,
} from './store/actions/cartAction';
import { changePageView as changePageViewAction } from './store/actions/pageAction';
import { PAGES } from './store/actions/actionTypes';

const rootStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: 'auto',
  width: '90vw',
};

const itemsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '90%'
};

const checkoutCardContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {
      cartItems,
      hydrateCartItems,
    } = this.props;
    if (cartItems.length === 0) {
      hydrateCartItems();
    }
  }

  onProceedToCheckout = () => {
    const { changePageView } = this.props;
    changePageView(PAGES.MY_PURCHASES);
  };

  onKeepShoppingClick = () => {
    const { changePageView } = this.props;
    changePageView(PAGES.HOME);
  };

  render() {
    const { cartItems: cartItemObj } = this.props;
    const cartItems = Object.values(cartItemObj);
    const cartItemPrices = cartItems.map(cartItem => cartItem.price);
    const subtotal = cartItemPrices != null && cartItemPrices.length > 0 ? cartItemPrices.reduce((a, b) => a + b, 0) : 0;

    return (
      <div style={rootStyle}>
        <div style={itemsContainerStyle}>
          <>
            {cartItems.length}
            {' '}
            items in your cart
          </>
          {cartItems.map(item => <CartItem key={item.id} item={item} />)}
        </div>
        <div style={checkoutCardContainerStyle}>
          <button type="submit" className="btn btn-primary" onClick={this.onKeepShoppingClick}>Keep Shopping</button>
          <button type="submit" className="btn btn-primary" onClick={this.onProceedToCheckout}>Proceed to checkout</button>
          <>
            Subtotal:
            {' '}
            {subtotal}
          </>
        </div>
      </div>
    );
  }
}

Cart.defaultProps = {
  cartItems: PropTypes.array,
  changePageView: PropTypes.func,
  hydrateCartItems: PropTypes.func
};

Cart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cartItems: PropTypes.array,
  changePageView: PropTypes.func,
  hydrateCartItems: PropTypes.func
};


const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  items: state.item.items,
  shop: state.item.shop,
  shoppingItemOverviewItem: state.item.shoppingItemOverviewItem,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  changePageView: page => dispatch(changePageViewAction(page)),
  hydrateCartItems: () => dispatch(hydrateCartItemsAction()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
