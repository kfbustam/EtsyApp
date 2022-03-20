import React, { Component } from 'react';
import PropTypes from 'prop-types';

const errorMessageStyle = {
  color: 'red'
};

const shopItemCardStyle = {
  display: 'flex',
  flexDirection: 'column',
};


const shopItemImgStyle = {
  position: 'relative',
  paddingLeft: 30
};

class ShopItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
    };
  }


  render() {
    const { shopItem } = this.props;
    const {
      cost, imgURL, itemName
    } = shopItem;
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
        <div style={shopItemCardStyle}>
          <img style={shopItemImgStyle} src={imgURL} alt="Logo" />
          <div>{itemName}</div>
          <div>{`$${cost}`}</div>
        </div>
      </>
    );
  }
}

ShopItem.defaultProps = {
  shopItem: PropTypes.any,
};

ShopItem.propTypes = {
  shopItem: PropTypes.any,
};

export default ShopItem;
