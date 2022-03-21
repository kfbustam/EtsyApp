import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';

const errorMessageStyle = {
  color: 'red'
};

const purchaseItemCardStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const purchaseItemCardHeaderStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const purchaseItemCardBodyStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const purchaseItemCardBodyDescriptionStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const purchaseItemCardBodyButtonsStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const noteInputStyle = {
  borderRadius: 25,
  margin: '5px 0px 0px 0px',
  paddingLeft: 20,
  position: 'relative',
};

const purchaseItemCardCouponCodeLinkStyle = {

};

const purchaseItemPriceStyle = {
  margin: 'auto'
};

class PurchaseHistoryItem extends Component {
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
    const { changePurchaseHistoryItemNote, item } = this.props;
    this.debounce(() => {
      changePurchaseHistoryItemNote(item.id, e.target.value);
    }, 3000);
  };

  onBuyThisAgainClick = () => {

  };

  render() {
    const { item } = this.props;
    const {
      createDate,
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
      quantity
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
        <div style={purchaseItemCardStyle}>
          <div style={purchaseItemCardHeaderStyle}>
            Purchased from
            {' '}
            {shopName}
            {' '}
            on
            {' '}
            {(new Date(createDate)).toString()}
          </div>
          <div style={purchaseItemCardBodyStyle}>
            <div style={purchaseItemCardBodyStyle}>
              <img src={src} alt="itemImg" />
              <div style={purchaseItemCardBodyDescriptionStyle}>
                <div>{itemName}</div>
                <div>{description}</div>
                <div>
                  Quantity:
                  {' '}
                  {quantity}
                </div>
                <div style={purchaseItemCardBodyButtonsStyle}>
                  <button type="submit" className="btn btn-primary" onClick={this.onBuyThisAgainClick}>Buy this again</button>
                  <div style={purchaseItemPriceStyle}>
                    $
                    {price}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

PurchaseHistoryItem.defaultProps = {
  item: PropTypes.object,
};

PurchaseHistoryItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseHistoryItem);
