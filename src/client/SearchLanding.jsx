import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  Heart, QuestionCircle, Filter, ArrowRight
} from 'react-bootstrap-icons';
import Header from './nav/Header';


const searchLandingShoppingItemsHeaderStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%'
};

const errorMessageStyle = {
  color: 'red'
};

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const itemCardStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const itemsContainerStyle = {
  flexWrap: 'wrap'
};

const priceDiscountStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const moreLikeThisLinkStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const ESTIMATED_ARRIVAL_TIMES = ['Any time'];

const SORT_BY_OPTIONS = ['Relevancy'];

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
    const { items } = this.props;
    const {
      errorMessages,
      estimatedArrival,
      sortBy
    } = this.state;

    return (
      <div style={rootStyle}>
        <Header />
        {
          errorMessages != null
          && Object.keys(errorMessages).map(
            errorMessageKey => <p style={errorMessageStyle}>{errorMessages[errorMessageKey]}</p>
          )
        }
        <div style={searchLandingShoppingItemsHeaderStyle}>
          <Form.Select aria-label="Default select example" onChange={this.onEstimatedArrivalChange}>
            <option>
              Estimated Arrival
              {' '}
              {estimatedArrival}
            </option>
            {
            ESTIMATED_ARRIVAL_TIMES.map(
              estimatedArrivalTime => (
                <option value={estimatedArrivalTime}>
                  {estimatedArrivalTime}
                </option>
              )
            )
          }
          </Form.Select>
          <Filter />
          <Button variant="primary">All Filters</Button>
          <>
            {items.length}
            {' '}
            results, with Ads
          </>
          <QuestionCircle />
          <Heart />
          <Form.Select aria-label="Default select example" onChange={this.onSortByChange}>
            <option>
              Sort by:
              {' '}
              {sortBy}
            </option>
            {
            SORT_BY_OPTIONS.map(
              sortByOption => (
                <option value={sortByOption}>
                  {sortByOption}
                </option>
              )
            )
          }
          </Form.Select>
        </div>
        <div style={itemsContainerStyle}>
          {items.map(
            item => (
              <div style={itemCardStyle}>
                <img src={item.src} alt="react" />
                <>{item.name}</>
                <>{item.reviews}</>
                <div style={priceDiscountStyle}>
                  {item.price}
                  {' '}
                  {item.discount}
                </div>
                {item.isAd && <>Ad by Etsy seller</>}
                {item.isPopularNow && <>Popular now</>}
                <div style={moreLikeThisLinkStyle}>
                  <>More like this</>
                  <ArrowRight />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

SearchLanding.defaultProps = {
  items: PropTypes.array,
};

SearchLanding.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array,
};

export default SearchLanding;
