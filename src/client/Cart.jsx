import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';

const rootStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const itemsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const checkoutCardContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookAuthor: '',
      bookID: 0,
      bookTitle: '',
      errorMessages: [],
    };
  }

  onProceedToCheckout = () => {

  };

  onKeepShoppingClick = () => {};

  render() {
    const { cart, onTabClicked, onMessageUpdated } = this.props;
    const {
      bookAuthor,
      bookID,
      bookTitle,
      errorMessages
    } = this.state;
    const {
      items
    } = cart;

    return (
      <>
        <div style={rootStyle}>
          <div style={itemsContainerStyle}>
            <>
              {items.length}
              {' '}
              items in your cart
            </>
            {items.map(item => <CartItem item={item} />)}
          </div>
          <div style={checkoutCardContainerStyle}>
            <button type="submit" className="btn btn-primary" onClick={this.onKeepShoppingClick}>Keep Shopping</button>
            <button type="submit" className="btn btn-primary" onClick={this.onProceedToCheckout}>Proceed to checkout</button>
          </div>
        </div>
      </>
    );
  }
}

Cart.defaultProps = {
  cart: PropTypes.object,
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
};

Cart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cart: PropTypes.object,
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
};

export default Cart;
