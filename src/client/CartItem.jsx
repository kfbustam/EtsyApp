import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import {
  removeItemFromCart as removeItemFromCartAction,
} from './store/actions/cartAction';

const errorMessageStyle = {
  color: 'red'
};

const cartItemCardStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const cartItemCardHeaderStyle = {
  display: 'flex',
  flexDirection: 'row',
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
    };
  }

  onSaveForLaterClick = () => {

  }

  onRemoveClick = () => {
    const { item, removeItemFromCart } = this.props;
    removeItemFromCart(item.id);
  }

  onApplyShopCouponCodesClick = () => {

  }

  debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  onNoteInputChange = (e) => {
    const { changeCartItemNote, item } = this.props;
    this.debounce(() => {
      changeCartItemNote(item.id, e.target.value);
    }, 3000);
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
      id: itemID,
      images,
      isEtsysPick,
      isStarSeller,
      isFavorited,
      name: itemName,
      saleCount,
      sizes,
      stockCount,
    } = item;
    const {
      errorMessages
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
          </div>
          <input className="form-control" type="text" placeholder="Add a note to seller" aria-label="Note" onChange={this.onNoteInputChange} style={noteInputStyle} />
        </div>
      </>
    );
  }
}

CartItem.defaultProps = {
  item: PropTypes.object,
  removeItemFromCart: PropTypes.func
};

CartItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
  removeItemFromCart: PropTypes.func
};

const mapStateToProps = state => ({
  cartItem: state.cart.cartItem,
});

const mapDispatchToProps = dispatch => ({
  removeItemFromCart: itemID => dispatch(removeItemFromCartAction(itemID)),

});


export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
