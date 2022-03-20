import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Heart } from 'react-bootstrap-icons';

const errorMessageStyle = {
  color: 'red'
};

const favoriteItemCardStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const favoriteItemImgContainerStyle = {
  position: 'relative',
  padding: 0,
  margin: 0,
  width: '80%'
};

const favoriteItemImgStyle = {
  position: 'relative',
  paddingLeft: 30
};

const heartIconStyle = {
  position: 'absolute',
  bottom: 16,
  right: 10,
  width: 10,
  height: 10,
};


class FavoriteItem extends Component {
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
    const { favoriteItem } = this.props;
    const {
      companyName, cost, imgURL, isShippingEligible, itemName
    } = favoriteItem;
    const {
      errorMessages
    } = this.state;
    const onBookAuthorNameInputChange = (e) => {
      this.setState({ bookAuthor: e.target.value });
    };

    return (
      <div className="container">
        {
          errorMessages != null
          && Object.keys(errorMessages).map(
            errorMessageKey => <p style={errorMessageStyle}>{errorMessages[errorMessageKey]}</p>
          )
        }
        <div style={favoriteItemCardStyle}>
          <div style={favoriteItemImgContainerStyle}>
            <img style={favoriteItemImgStyle} src={imgURL} alt="Logo" />
            <Heart style={heartIconStyle} />
          </div>
          <div>{itemName}</div>
          <div>{companyName}</div>
          <div>{`$${cost}`}</div>
          {isShippingEligible && <div>Free shipping eligible</div>}
        </div>
      </div>
    );
  }
}

FavoriteItem.defaultProps = {
  favoriteItem: PropTypes.any,
};

FavoriteItem.propTypes = {
  favoriteItem: PropTypes.any,
};

export default FavoriteItem;
