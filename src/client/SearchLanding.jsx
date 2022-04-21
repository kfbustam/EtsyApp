import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  HeartFill, Heart, ArrowRight
} from 'react-bootstrap-icons';
import { connect } from 'react-redux';
import Header from './nav/Header';
import {
  addItemToFavorites as addItemToFavoritesAction,
  removeItemFromFavorites as removeItemFromFavoritesAction,
} from './store/actions/itemAction';

const searchLandingShoppingItemsHeaderStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
};

const favoriteItemImgStyle = {
  position: 'relative',
  paddingLeft: 30
};

const heartIconStyle = {
  position: 'absolute',
  top: 16,
  right: 10,
  width: 30,
  height: 30,
};

const errorMessageStyle = {
  color: 'red'
};

const favoriteItemImgContainerStyle = {
  position: 'relative',
  margin: '10px 10px 10px 10px'
};


const itemsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};

const itemCardContainerStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const itemCardDescriptionStyle = {
  left: 30,
  paddingLeft: 40,
  paddingTop: 10
};

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const itemCardStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const itemCardButtonContainerStyle = {
  width: '258px',
  height: '200px',
  position: 'absolute',
  marginLeft: 40,
  marginTop: 60,
  zIndex: 10
};

const pricePillStyle = {
  position: 'absolute',
  left: 30,
  width: 10,
  height: 10,
};

const priceDiscountStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const moreLikeThisLinkStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const filterStyle = {
  width: '20%',
  height: '10%'
};

const ESTIMATED_ARRIVAL_TIMES = ['Any time'];

const SORT_BY_OPTIONS = ['Price', 'Quantity', 'Sales Count'];

class SearchLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookAuthor: '',
      bookID: 0,
      bookTitle: '',
      errorMessages: [],
      estimatedArrival: 'Any time',
      sortBy: 'Relevancy'
    };
  }

  onEstimatedArrivalChange = (e) => {
    this.setState({ estimatedArrival: e.target.value });
  }

  onSortByChange = (e) => {
    this.setState({ sortBy: e.target.value });
  }

  render() {
    const {
      addItemToFavorites,
      removeItemFromFavorites,
      searchResult: items
    } = this.props;
    const {
      errorMessages,
      estimatedArrival,
      sortBy
    } = this.state;

    return (
      <div style={rootStyle}>
        {
          errorMessages != null
          && Object.keys(errorMessages).map(
            errorMessageKey => <p style={errorMessageStyle}>{errorMessages[errorMessageKey]}</p>
          )
        }
        <div style={searchLandingShoppingItemsHeaderStyle}>
          <>
            {items.length}
            {' '}
            results, with Ads
          </>
          <div>
            <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
          </div>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Include Out of Stock Items"
          />
          <Form.Select aria-label="Default select example" onChange={this.onSortByChange} style={filterStyle}>
            <option label="Sort by">
              {sortBy}
            </option>
            {
            SORT_BY_OPTIONS.map(
              sortByOption => (
                <option value={sortByOption} key={sortByOption}>
                  {sortByOption}
                </option>
              )
            )
          }
          </Form.Select>
        </div>
        <div style={itemsContainerStyle}>
          { Object.values(items).map(item => (
            <div style={itemCardContainerStyle} key={item.name}>
              <div style={itemCardButtonContainerStyle} onClick={() => this.onItemClick(item.id)} onKeyPress={() => this.onItemClick(item.id)} role="button" tabIndex="-1" />
              <div style={favoriteItemImgContainerStyle}>
                <img style={favoriteItemImgStyle} src={item.src} alt="Logo" />
                <div style={pricePillStyle}>{`$${item.price}`}</div>
                {
                    item.isFavorited
                      ? <HeartFill style={heartIconStyle} onClick={() => removeItemFromFavorites(item.id)} onKeyPress={() => removeItemFromFavorites(item.id)} role="button" tabIndex="-1" /> : <Heart style={heartIconStyle} onClick={() => addItemToFavorites(item.id)} onKeyPress={() => addItemToFavorites(item.id)} role="button" tabIndex="-1" />
                  }
              </div>
              <div style={itemCardDescriptionStyle}>{`${item.name}`}</div>
            </div>
          ))
          }
        </div>
      </div>
    );
  }
}

SearchLanding.defaultProps = {
  addItemToFavorites: PropTypes.func,
  removeItemFromFavorites: PropTypes.func,
  searchResult: PropTypes.array,
};

SearchLanding.propTypes = {
  addItemToFavorites: PropTypes.func,
  removeItemFromFavorites: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  searchResult: PropTypes.array,
};

const mapStateToProps = state => ({
  searchResult: state.item.searchResult,
});

const mapDispatchToProps = dispatch => ({
  addItemToFavorites: itemID => dispatch(addItemToFavoritesAction(itemID)),
  removeItemFromFavorites: itemID => dispatch(removeItemFromFavoritesAction(itemID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchLanding);
