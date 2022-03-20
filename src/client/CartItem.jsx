import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

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
  flexFlow: 'column wrap',
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

const cartItemCardCouponCodeLinkStyle = {

};

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookAuthor: '',
      bookID: 0,
      bookTitle: '',
      errorMessages: [],
    };
  }

  onSaveForLaterClick = () => {

  }

  onRemoveClick = () => {

  }

  onApplyShopCouponCodesClick = () => {

  }

  render() {
    const { item } = this.props;
    const {
      companyName,
      companySrc,
      description,
      price,
      src,
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
          <div style={cartItemCardHeaderStyle}>
            <>
              <a href="/">
                <img src={companySrc} alt="itemCompanyImg" />
              </a>
              <a href="/">
                {companyName}
              </a>
            </>
            <>
              Contact Shop
            </>
          </div>
          <div style={cartItemCardBodyStyle}>
            <img src={src} alt="itemImg" />
            <div style={cartItemCardBodyDescriptionStyle}>
              <>{description}</>
              <div style={cartItemCardBodyButtonsStyle}>
                <button type="submit" className="btn btn-primary" onClick={this.onSaveForLaterClick}>Save for later</button>
                <button type="submit" className="btn btn-primary" onClick={this.onRemoveClick}>Remove</button>
              </div>
            </div>
            <>{price}</>
          </div>
          <div style={cartItemCardCouponCodeLinkStyle}>
            <button type="submit" className="btn btn-primary" onClick={this.onApplyShopCouponCodesClick}>Apply shop coupon codes</button>
          </div>
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and numbers, and
            must not contain spaces, special characters, or emoji.
          </Form.Text>
        </div>
      </>
    );
  }
}

CartItem.defaultProps = {
  item: PropTypes.object,
};

CartItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
};

export default CartItem;
