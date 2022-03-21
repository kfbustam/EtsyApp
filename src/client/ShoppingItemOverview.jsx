import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import {
  Heart,
  HeartFill
} from 'react-bootstrap-icons';
import { connect } from 'react-redux';
import {
  addItemToFavorites as addItemToFavoritesAction,
  removeItemFromFavorites as removeItemFromFavoritesAction,
} from './store/actions/itemAction';

const shoppingItemCardStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const shoppingItemDetailMetricsStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const priceAndStockInfoStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const shoppingItemDetailStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const shoppingItemImgContainerStyle = {
  margin: 'auto',
  position: 'relative',
  padding: 0,
  width: '40%'
};

const shoppingItemImgStyle = {
  position: 'relative',
};

const heartIconStyle = {
  position: 'absolute',
  bottom: 16,
  right: -40,
  width: 30,
  height: 30,
};

const errorMessageStyle = {
  color: 'red'
};

class ShoppingItemOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
    };
  }


  render() {
    const {
      addItemToFavorites,
      removeItemFromFavorites,
      shop,
      shoppingItemOverviewItem,
      user
    } = this.props;
    const {
      errorMessages
    } = this.state;
    const { name: shopName } = shop;
    const {
      arrivesByDate,
      doesItemShipFreeInUsersCountry,
      peopleWithItemInCartCount,
      description,
      id: itemID,
      images,
      isEtsysPick,
      isStarSeller,
      isFavorited,
      name: itemName,
      price,
      saleCount,
      sizes,
      stockCount,
    } = shoppingItemOverviewItem;
    const {
      countryOfStay
    } = user;
    return (
      <div>
        {
          errorMessages != null
          && Object.keys(errorMessages).map(
            errorMessageKey => (
              <p style={errorMessageStyle} key={errorMessages[errorMessageKey]}>
                {errorMessages[errorMessageKey]}
              </p>
            )
          )
        }
        <div style={shoppingItemCardStyle}>
          <div style={shoppingItemImgContainerStyle}>
            <div style={shoppingItemImgStyle}>
              <Carousel>
                { images != null
                  && images.map(
                    image => (
                      <Carousel.Item key={image.name}>
                        <img
                          className="d-block w-100"
                          src={image.src}
                          alt={image.name}
                        />
                      </Carousel.Item>
                    )
                  )
              }
              </Carousel>
            </div>
            {
              isFavorited
                ? <HeartFill style={heartIconStyle} onClick={() => removeItemFromFavorites(itemID)} onKeyPress={() => removeItemFromFavorites(itemID)} role="button" tabIndex="-1" /> : <Heart style={heartIconStyle} onClick={() => addItemToFavorites(itemID)} onKeyPress={() => addItemToFavorites(itemID)} role="button" tabIndex="-1" />
            }
          </div>
          <div style={shoppingItemDetailStyle}>
            <div>
              Shop Name:
              {' '}
              {shopName}
            </div>
            <div>
              Item Name:
              {' '}
              {itemName}
            </div>
            <div style={shoppingItemDetailMetricsStyle}>
              {isStarSeller && <div>Star Seller | </div>}
              <div>
                {saleCount}
                {' '}
                sales |
                {' '}
              </div>
              {isEtsysPick && <div>Etsys pick</div>}
              <div style={priceAndStockInfoStyle}>
                <div>{price}</div>
                <div>{stockCount > 0 && <div>In stock</div>}</div>
              </div>
              <div>Size</div>
              <select name="size" id="size">
                {sizes != null
                  && sizes.map(size => <option value={size} key={size}>{size}</option>)}
              </select>
              <Button variant="primary">Buy it now</Button>
              <Button variant="secondary">Add to cart</Button>
              {peopleWithItemInCartCount > 0 && (
              <div>
                Other people want this. Over
                {' '}
                {peopleWithItemInCartCount}
                {' '}
                people have this in their carts right now.
              </div>
              )}
              {isStarSeller && (
              <div>
                Star Seller. This seller has a history of 5-star reviews,
                shipping on time, and replying quickly when they got any messages.
              </div>
              )}
              {
                <div>
                  Arrives by
                  {' '}
                  {arrivesByDate}
                  {' '}
                  if you order today.
                </div>
              }
              { doesItemShipFreeInUsersCountry
                && (
                <div>
                  Hooray! This item ships free to the
                  {' '}
                  {countryOfStay}
                  .
                </div>
                )
              }
            </div>
            <div>{description}</div>
          </div>
        </div>
      </div>
    );
  }
}

ShoppingItemOverview.defaultProps = {
  addItemToFavorites: PropTypes.func,
  removeItemFromFavorites: PropTypes.func,
  // eslint-disable-next-line react/default-props-match-prop-types
  shop: PropTypes.object,
  shoppingItemOverviewItem: PropTypes.object,
  user: PropTypes.object,
};

ShoppingItemOverview.propTypes = {
  addItemToFavorites: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  shop: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  shoppingItemOverviewItem: PropTypes.object,
  removeItemFromFavorites: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  items: state.item.items,
  shop: state.item.shop,
  shoppingItemOverviewItem: state.item.shoppingItemOverviewItem,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  addItemToFavorites: itemID => dispatch(addItemToFavoritesAction(itemID)),
  removeItemFromFavorites: itemID => dispatch(removeItemFromFavoritesAction(itemID)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItemOverview);
