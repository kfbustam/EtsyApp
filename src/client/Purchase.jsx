import React, { Component } from 'react';
import PropTypes from 'prop-types';

const purchaseItemImgStyle = {};

const purchaseCardStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const purchaseActionButtonsStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const errorMessageStyle = {
  color: 'red'
};

const purchaseCardListStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const purchaseItemStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const purchaseItemDescriptionStyle = {
  display: 'flex',
  flexDirection: 'column'
};

class MyPurchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookAuthor: '',
      bookID: 0,
      bookTitle: '',
      errorMessages: [],
    };
  }


  render() {
    const { onTabClicked, onMessageUpdated, purchases } = this.props;
    const {
      bookAuthor,
      bookID,
      bookTitle,
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
        {purchases.map(([time, purchaseBatchInfo]) => (
          <div style={purchaseCardStyle}>
            <div style={purchaseCardListStyle}>
              {purchaseBatchInfo.purchaseBatch.map(purchase => (
                <div style={purchaseItemStyle}>
                  <img style={purchaseItemImgStyle} src={purchase.src} alt="Logo" />
                  <div style={purchaseItemDescriptionStyle}>
                    <>{purchase.name}</>
                    <>{purchase.shopName}</>
                    <>{purchase.description}</>
                    <>
                      {purchase.quantity}
                      {' '}
                      units
                    </>
                    <>{purchase.price}</>
                    <>{purchase.purchaseDate}</>
                  </div>
                </div>
              ))}
            </div>
            <div style={purchaseActionButtonsStyle}>
              <>{purchaseBatchInfo.isDelivered ? 'Delivered' : 'Not Delivered'}</>
              <>{purchaseBatchInfo.isDelivered ? `On ${time}` : ''}</>
              <>
                Estimated delivery:
                {' '}
                {purchaseBatchInfo.estimatedDeliveryDate}
              </>
            </div>
          </div>
        ))}
      </>
    );
  }
}

MyPurchases.defaultProps = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
  purchases: PropTypes.array,
};

MyPurchases.propTypes = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  purchases: PropTypes.array,
};

export default MyPurchases;
