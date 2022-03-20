import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import ItemContainer from './ItemContainer';
import Search from './Search';
import ShopItem from './ShopItemCard';

const createFormControlStyle = {
  background: '#f7f7f7 none repeat scroll 0 0',
  border: '1px solid #d4d4d4',
  borderRadius: 4,
  fontSize: 14,
  height: 50,
  lineHeight: 50,
  width: '100%'
};

const createFormGroupStyle = {
  marginBottom: 10,
};

const shopPictureSectionStyle = {
  display: 'flex',
  flexDirection: 'column'
};

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
  height: 20,
  width: 40,
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

class ShopHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookAuthor: '',
      bookID: 0,
      bookTitle: '',
      errorMessages: [],
    };
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
      onTabClicked, onMessageUpdated, shopInfo, shopOwnerInfo
    } = this.props;
    const {
      admirerCount, dateJoined, shopName, saleCount, src: shopInfoSrc, shopItems
    } = shopInfo;
    const { shopOwnerName, shopOwnerImgSrc } = shopOwnerInfo;
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
            errorMessageKey => <p style={errorMessageStyle}>{errorMessages[errorMessageKey]}</p>
          )
        }
        <div style={shopInfoSectionStyle}>
          <div style={shopInfoDetailSectionContainerStyle}>
            <img alt="shop" src={shopInfoSrc} style={iconStyle} />
            <div style={shopInfoDetailSectionStyle}>
              <div>
                {shopName}
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
            <img alt="shop" src={shopOwnerImgSrc} style={iconStyle} />
            <div>{shopOwnerName}</div>
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
          <>
            {shopItems.map(shopItem => <ShopItem shopItem={shopItem} />)}
          </>
        </div>
      </>
    );
  }
}

ShopHome.defaultProps = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
  shopInfo: PropTypes.object,
  shopOwnerInfo: PropTypes.object,
};

ShopHome.propTypes = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  shopInfo: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  shopOwnerInfo: PropTypes.object,
};

export default ShopHome;
