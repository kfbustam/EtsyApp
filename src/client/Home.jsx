import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Heart,
  HeartFill
} from 'react-bootstrap-icons';
import { connect } from 'react-redux';
import Footer from './Footer';
import {
  addItemToFavorites as addItemToFavoritesAction,
  hydrateShoppingItems as hydrateShoppingItemsAction,
  removeItemFromFavorites as removeItemFromFavoritesAction,
  viewShoppingItemOverview as viewShoppingItemOverviewAction,
} from './store/actions/itemAction';
import { changePageView as changePageViewAction } from './store/actions/pageAction';

import { PAGES } from './store/actions/actionTypes';

const itemsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};

const favoriteItemImgContainerStyle = {
  position: 'relative',
  margin: '10px 10px 10px 10px'
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

const pricePillStyle = {
  position: 'absolute',
  left: 30,
  width: 10,
  height: 10,
};


const recentActivityRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: 10,
  paddingTop: 10,
  width: '100%'
};

const welcomeBackStyle = {
  margin: '0 auto',
  paddingBottom: 10,
  paddingTop: 10,
  width: 'fit-content'
};

const itemCardContainerStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const itemCardButtonContainerStyle = {
  width: '258px',
  height: '200px',
  position: 'absolute',
  marginLeft: 40,
  marginTop: 60,
  zIndex: 10
};

const itemCardDescriptionStyle = {
  left: 30,
  paddingLeft: 40,
  paddingTop: 10
};

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'space-between'
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {
      hydrateShoppingItems,
      items
    } = this.props;
    if (Object.keys(items).length === 0) {
      hydrateShoppingItems();
    }
  }

  onItemClick = (itemID) => {
    const {
      changePageView,
      viewShoppingItemOverview
    } = this.props;
    viewShoppingItemOverview(itemID);
    changePageView(PAGES.SHOPPING_ITEM_OVERVIEW);
  };

  render() {
    const {
      addItemToFavorites, removeItemFromFavorites, items, user
    } = this.props;
    const { username } = user;
    return (
      <div style={rootStyle}>
        <div>
          <div style={welcomeBackStyle}>
            Welcome back,
            {' '}
            {username}
            !
          </div>
          <div style={recentActivityRowStyle}>
            <div>Your recent activity</div>
            <div>Recently favorited and viewed items</div>
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
        <Footer />
      </div>
    );
  }
}

Home.defaultProps = {
  addItemToFavorites: PropTypes.func,
  changePageView: PropTypes.func,
  hydrateShoppingItems: PropTypes.func,
  items: PropTypes.array,
  removeItemFromFavorites: PropTypes.func,
  user: PropTypes.object,
  viewShoppingItemOverview: PropTypes.func,
};

Home.propTypes = {
  addItemToFavorites: PropTypes.func,
  changePageView: PropTypes.func,
  hydrateShoppingItems: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array,
  removeItemFromFavorites: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  viewShoppingItemOverview: PropTypes.func,
};

const mapStateToProps = state => ({
  items: state.item.items,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  addItemToFavorites: itemID => dispatch(addItemToFavoritesAction(itemID)),
  changePageView: page => dispatch(changePageViewAction(page)),
  hydrateShoppingItems: () => dispatch(hydrateShoppingItemsAction()),
  removeItemFromFavorites: itemID => dispatch(removeItemFromFavoritesAction(itemID)),
  viewShoppingItemOverview: itemID => dispatch(viewShoppingItemOverviewAction(itemID)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
