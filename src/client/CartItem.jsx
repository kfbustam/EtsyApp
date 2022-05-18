import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import {
  removeItemFromCart as removeItemFromCartAction,
  updateCartItem as updateCartItemAction
} from './store/actions/cartAction';

const errorMessageStyle = {
  color: 'red'
};

const cartItemCardStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const cartItemCardBodyStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const cartItemCardBodyDescriptionStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const cartItemCardBodyButtonsStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const noteInputStyle = {
  borderRadius: 25,
  margin: '5px 0px 0px 0px',
  paddingLeft: 20,
  position: 'relative',
};

const cartItemCardCouponCodeLinkStyle = {

};

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      isGift: false,
      isQuantityInvalid: false
    };
  }

  onIsGiftClick = () => {
    const { isGift } = this.state;
    this.setState({
      isGift: !isGift,
    });
  }

  onSaveForLaterClick = () => {

  }

  onRemoveClick = () => {
    const { item, removeItemFromCart } = this.props;
    removeItemFromCart(item.id);
  }

  onApplyShopCouponCodesClick = () => {

  }

  onGiftNoteInputChange = (e) => {
    const { updateCartItem, item } = this.props;
    const oldItem = item;
    oldItem.giftNote = e.target.value;
    updateCartItem(oldItem);
  };

  onNoteInputChange = (e) => {
    const { updateCartItem, item } = this.props;
    const oldItem = item;
    oldItem.description = e.target.value;
    updateCartItem(oldItem);
  };

  quantityChange = (e) => {
    if (!Number(e.target.value)) {
      this.setState({
        isQuantityInvalid: true
      });
      return;
    }

    const { updateCartItem, item } = this.props;
    const oldItem = item;
    oldItem.quantity = e.target.value;
    updateCartItem(oldItem);
    this.setState({
      isQuantityInvalid: false
    });
  };

  render() {
    const { item } = this.props;
    const {
      shopName,
      shopSrc,
      description,
      price,
      src,
      arrivesByDate,
      doesItemShipFreeInUsersCountry,
      peopleWithItemInCartCount,
      _id: itemID,
      images,
      isEtsysPick,
      isStarSeller,
      isFavorited,
      name: itemName,
      saleCount,
      sizes,
      stockCount,
      quantity
    } = item;
    const {
      errorMessages,
      isGift,
      isQuantityInvalid
    } = this.state;

    return (
      <>
        {
          errorMessages != null
          && Object.keys(errorMessages).map(
            errorMessageKey => <p style={errorMessageStyle}>{errorMessages[errorMessageKey]}</p>
          )
        }
        <div style={cartItemCardStyle}>
          <div>{shopName}</div>
          <div style={cartItemCardBodyStyle}>
            <div style={cartItemCardBodyStyle}>
              <img src={src} alt="itemImg" />
              <div style={cartItemCardBodyDescriptionStyle}>
                <>{description}</>
                <Form.Control type="quantity" placeholder="Quantity" defaultValue={quantity} onChange={this.quantityChange} isInvalid={isQuantityInvalid} />
                <div style={cartItemCardBodyButtonsStyle}>
                  <button type="submit" className="btn btn-primary" onClick={this.onSaveForLaterClick}>Save for later</button>
                  <button type="submit" className="btn btn-primary" onClick={this.onRemoveClick}>Remove</button>
                </div>
              </div>
            </div>
            <div>
              $
              {price}
            </div>
          </div>
          <div style={cartItemCardCouponCodeLinkStyle}>
            <button type="submit" className="btn btn-primary" onClick={this.onApplyShopCouponCodesClick}>Apply shop coupon codes</button>
            <Form.Check
              type="checkbox"
              id="isGift"
              label="Pack as a Gift?"
              onClick={this.onIsGiftClick}
            />
          </div>
          {isGift && <input className="form-control" type="text" placeholder="Add a note with the gift" aria-label="Gift Note" onChange={this.onGiftNoteInputChange} style={noteInputStyle} />}
          <input className="form-control" type="text" placeholder="Add a note to seller" aria-label="Note" onChange={this.onNoteInputChange} style={noteInputStyle} />
        </div>
      </>
    );
  }
}

CartItem.defaultProps = {
  item: PropTypes.object,
  removeItemFromCart: PropTypes.func,
  updateCartItem: PropTypes.func
};

CartItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
  removeItemFromCart: PropTypes.func,
  updateCartItem: PropTypes.func
};

const mapStateToProps = state => ({
  cartItem: state.cart.cartItem,
});

const mapDispatchToProps = dispatch => ({
  removeItemFromCart: itemID => dispatch(removeItemFromCartAction(itemID)),
  updateCartItem: updatedItem => dispatch(updateCartItemAction(updatedItem)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
