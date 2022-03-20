import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { Heart } from 'react-bootstrap-icons';

const shoppingItemCardStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const shoppingItemDetailMetricsStyle = {
  display: 'flex',
  flexDirection: 'row',
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
  position: 'relative',
  padding: 0,
  margin: 0,
  width: '80%'
};

const shoppingItemImgStyle = {
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

const errorMessageStyle = {
  color: 'red'
};

class ShoppingItemOverview extends Component {
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
    const {
      onTabClicked, onMessageUpdated, shoppingItem, user
    } = this.props;
    const {
      bookAuthor,
      bookID,
      bookTitle,
      errorMessages
    } = this.state;
    const {
      arrivesByDate,
      doesItemShipFreeInUsersCountry,
      peopleWithItemInCartCount,
      description,
      images,
      isEtsysPick,
      isStarSeller,
      name,
      price,
      saleCount,
      sizes,
      stockCount,
    } = shoppingItem;
    const {
      countryOfStay
    } = user;
    const onBookAuthorNameInputChange = (e) => {
      this.setState({ bookAuthor: e.target.value });
    };
    const onBookAuthorTitleInputChange = (e) => {
      this.setState({ bookTitle: e.target.value });
    };
    const onBookIDInputChange = (e) => {
      this.setState({ bookID: e.target.value });
    };
    const onSubmit = () => {
      createBookRequest({ bookAuthor, bookID, bookTitle }).then((res) => {
        res.json().then((resp) => {
          if (res.ok) {
            onMessageUpdated(resp.messages);
            onTabClicked('home');
          } else {
            this.setState({ errorMessages: resp.errorMessages });
          }
        });
      });
    };
    return (
      <>
        {
          errorMessages != null
          && Object.keys(errorMessages).map(
            errorMessageKey => <p style={errorMessageStyle} key={errorMessages[errorMessageKey]}>{errorMessages[errorMessageKey]}</p>
          )
        }
        <div style={shoppingItemCardStyle}>
          <div style={shoppingItemImgContainerStyle}>
            <div style={shoppingItemImgStyle}>
              <Carousel>
                {
                  images.map(
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
            <Heart style={heartIconStyle} />
          </div>
          <div style={shoppingItemDetailStyle}>
            <>{name}</>
            <div style={shoppingItemDetailMetricsStyle}>
              {isStarSeller && <>Star Seller | </>}
              <>
                {saleCount}
                {' '}
                sales |
              </>
              {isEtsysPick && <>Etsys pick</>}
              <div style={priceAndStockInfoStyle}>
                <>{price}</>
                <>{stockCount > 0 && <>In stock</>}</>
              </div>
              <>Size</>
              <select name="size" id="size">
                {sizes.map(size => <option value={size} key={size.label}>size</option>)}
              </select>
              <Button variant="primary">Buy it now</Button>
              <Button variant="secondary">Add to cart</Button>
              {peopleWithItemInCartCount > 0 && (
              <>
                Other people want this. Over
                {' '}
                {peopleWithItemInCartCount}
                {' '}
                people have this in their carts right now.
              </>
              )}
              {isStarSeller && (
              <>
                Star Seller. This seller has a history of 5-star reviews,
                shipping on time, and replying quickly when they got any messages.
              </>
              )}
              {
                <>
                  Arrives by
                  {' '}
                  {arrivesByDate}
                  {' '}
                  if you order today.
                </>
              }
              { doesItemShipFreeInUsersCountry
                && (
                <>
                  Hooray! This item ships free to the
                  {' '}
                  {countryOfStay}
                  .
                </>
                )
              }
            </div>
            <>{description}</>
          </div>
        </div>
      </>
    );
  }
}

ShoppingItemOverview.defaultProps = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
  shoppingItem: PropTypes.object,
  user: PropTypes.object,
};

ShoppingItemOverview.propTypes = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  shoppingItem: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

export default ShoppingItemOverview;
