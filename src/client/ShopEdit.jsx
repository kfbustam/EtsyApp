import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux';
import ItemContainer from './ItemContainer';
import Search from './Search';
import ShopItem from './ShopItemCard';
import { hydrateShopInfo as hydrateShopInfoAction } from './store/actions/shopAction';

const errorMessageStyle = {
  color: 'red'
};

const shopInfoSectionStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
};

const storeDetailedInfoStyle = {
  display: 'flex',
  flexDirection: 'row'
};

const storeDetailedInfoActionButtonsStyle = {
  display: 'flex',
  flexDirection: 'row'
};

const itemsSectionContainerStyle = {
  display: 'flex',
  flexDirection: 'row'
};

const iconStyle = {
  margin: 'auto 6px',
};

const shopInfoDetailSectionStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const shopInfoDetailSectionContainerStyle = {
  display: 'flex',
  flexDirection: 'row'
};

const shopOwnerInfoStyle = {
  display: 'flex',
  flexDirection: 'column'
};
const itemsSectionHeader = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
};

const itemsSectionControlPanelStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const ITEMS_FILTER_OPTIONS = [
  { label: 'Sort: Most Recent', value: 'sort_most_recent' },
];

const CATEGORIES = [
  { label: 'All' },
  { label: 'Healthy Habits' }
];

class ShopEdit extends Component {
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
      myShopInfo,
      hydrateShopInfo,
    } = this.props;
    if (myShopInfo.length === 0) {
      hydrateShopInfo();
    }
  }

  onEditShopButtonClick = () => {
    console.log('');
  }

  onFavoriteShopButtonClick = () => {
    console.log('');
  }

  onContactShopOwnerClick = () => {
    console.log('');
  }

  render() {
    const {
      myShopInfo
    } = this.props;
    console.log(myShopInfo)
    const {
      admirerCount,
      dateJoined,
      name,
      saleCount,
      src: shopInfoSrc,
      items: shopItems,
      ownerInfo
    } = myShopInfo;
    const {
      bookAuthor,
      bookID,
      bookTitle,
      errorMessages
    } = this.state;
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

    };
    return (
      <>
        {
          errorMessages != null
          && Object.keys(errorMessages).map(
            errorMessageKey => <p style={errorMessageStyle}>{errorMessages[errorMessageKey]}</p>
          )
        }
        <div style={shopInfoSectionStyle}>
          <div style={shopInfoDetailSectionContainerStyle}>
            <img alt="shop" src={shopInfoSrc} style={iconStyle} />
            <div style={shopInfoDetailSectionStyle}>
              <div>
                {name}
              </div>
              <div style={storeDetailedInfoStyle}>{`${saleCount} Sales | On Etsy since ${dateJoined}`}</div>
              <div style={storeDetailedInfoActionButtonsStyle}>
                <button type="submit" className="btn btn-primary" onClick={this.onEditShopButtonClick}>Edit shop</button>
                <button type="submit" className="btn btn-primary" onClick={this.onFavoriteShopButtonClick}>Favorite shop</button>
              </div>
            </div>
          </div>
          <div style={shopOwnerInfoStyle}>
            <div>SHOP OWNER</div>
            {ownerInfo?.shopOwnerImgSrc && <img alt="shop" src={ownerInfo.shopOwnerImgSrc} style={iconStyle} />}
            {ownerInfo?.shopOwnerName && <div>{ownerInfo.shopOwnerName}</div>}
            <div>Contact</div>
          </div>
        </div>
        <div style={itemsSectionHeader}>
          <div>Items</div>
          <select name="itemsFilter" id="itemsFilter">
            {
              ITEMS_FILTER_OPTIONS.map(itemFilter => <option value={itemFilter.value}>{itemFilter.label}</option>)
            }
          </select>
        </div>
        <div style={itemsSectionContainerStyle}>
          <div style={itemsSectionControlPanelStyle}>
            <Search />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    {CATEGORIES.map(category => (
                      <Nav.Item>
                        <Nav.Link eventKey={category.label}>{category.label}</Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    {CATEGORIES.map(category => (
                      <Tab.Pane eventKey={category.label}>
                        <ItemContainer />
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
            <button type="submit" className="btn btn-primary" onClick={this.onContactShopOwnerClick}>Contact shop owner</button>
            <>{`${saleCount} Sales`}</>
            <>{`${admirerCount} Admirers`}</>
          </div>
          {shopItems != null && (
            <>
              {shopItems.map(shopItem => <ShopItem shopItem={shopItem} />)}
            </>
          )}
        </div>
      </>
    );
  }
}

ShopEdit.defaultProps = {
  hydrateShopInfo: PropTypes.func,
  myShopInfo: PropTypes.object,
};

ShopEdit.propTypes = {
  hydrateShopInfo: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  myShopInfo: PropTypes.object,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  hydrateShopInfo: () => dispatch(hydrateShopInfoAction()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopEdit);
