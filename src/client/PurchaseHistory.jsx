import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  hydratePurchaseHistoryItems as hydratePurchaseHistoryItemsAction,
} from './store/actions/purchaseAction';
import PurchaseHistoryItem from './PurchaseHistoryItem';

const errorMessageStyle = {
  color: 'red'
};

const rootStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: 'auto',
  width: '90vw',
  flexDirection: 'column',
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

class PurchaseHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookAuthor: '',
      bookID: 0,
      bookTitle: '',
      errorMessages: [],
    };
  }

  componentDidMount() {
    const {
      hydratePurchaseHistoryItems,
      purchaseHistory
    } = this.props;
    if (purchaseHistory.length === 0) {
      hydratePurchaseHistoryItems();
    }
  }

  render() {
    const { purchaseHistory } = this.props;
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
        <div style={rootStyle}>
          <>
            Purchases
          </>
          {Object.values(purchaseHistory).map(item => <PurchaseHistoryItem key={item.id} item={item} />)}
        </div>
      </>
    );
  }
}

PurchaseHistory.defaultProps = {
  hydratePurchaseHistoryItems: PropTypes.func,
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
  purchaseHistory: PropTypes.array,
};

PurchaseHistory.propTypes = {
  hydratePurchaseHistoryItems: PropTypes.func,
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  purchaseHistory: PropTypes.array,
};

const mapStateToProps = state => ({
  hydratePurchaseHistoryItems: PropTypes.func,
  purchaseHistory: state.purchase.purchaseHistory,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  hydratePurchaseHistoryItems: () => dispatch(hydratePurchaseHistoryItemsAction()),
});


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseHistory);
