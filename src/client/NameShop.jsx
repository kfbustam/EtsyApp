import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Check as CheckIcon } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { checkShopName as checkShopNameAction, createShop as createShopAction, clearShopName as clearShopNameAction } from './store/actions/shopAction';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const dividerStyle = {
  borderTop: '3px solid #bbb'
};

const searchContainerStyle = {
  display: 'flex',
  flexDirection: 'row'
};


const searchInputStyle = {
  borderRadius: 25,
  margin: '5px 0px 0px 0px',
  paddingLeft: 20,
  position: 'relative',
  height: 70
};

const searchInputContainerStyle = {
  margin: 'auto',
  position: 'relative',
  width: '90%'
};

const availableChipStyle = {
  background: 'orange',
  bottom: 12,
  display: 'flex',
  flexDirection: 'row',
  height: '50%',
  position: 'absolute',
  right: '15%',
};

const checkIconStyle = {
  color: 'white',
  margin: 'auto'
};

const availableStringStyle = {
  color: 'white',
  margin: 'auto'
};

const checkAvailabilityStyle = {
  bottom: 12,
  display: 'flex',
  flexDirection: 'row',
  height: '50%',
  position: 'absolute',
  right: '1%',
};

const SHOP_NAME_DESCRIPTON = 'Your shop name will appear in your shop and next to each of your listings throughout Etsy. After you open your shop, you can change your name once.';

class NameShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopName: ''
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

  onCheckAvailabilityClick = () => {
    const {
      checkShopName
    } = this.props;
    const { shopName } = this.state;
    checkShopName(shopName);
  };

  onChangeShopName = (e) => {
    const {
      clearShopName
    } = this.props;
    clearShopName();
    this.setState({
      shopName: e.target.value
    });
  };

  onShopNameSaveClick = () => {
    const {
      createShop
    } = this.props;
    const { shopName } = this.state;
    createShop(shopName);
  };

  render() {
    const {
      isShopNameAvailable
    } = this.props;
    const {
      shopName
    } = this.state;

    return (
      <div style={rootStyle}>
        <div style={{ margin: 'auto' }}>
          <h1>Name your shop</h1>
          <h2>Choose a memorable name that reflects your style.</h2>
        </div>
        <hr style={dividerStyle} />
        <div style={searchContainerStyle}>
          <div style={searchInputContainerStyle}>
            <input className="form-control" type="text" placeholder="Enter your shop name" aria-label="Search" onChange={this.onChangeShopName} style={searchInputStyle} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <>
                {isShopNameAvailable && (
                  <div style={availableChipStyle}>
                    <CheckIcon role="button" tabIndex="-1" style={checkIconStyle} />
                    <div style={availableStringStyle}>Available</div>
                  </div>
                )}
                {shopName.length > 0 && !isShopNameAvailable && (
                  <div style={{ ...availableChipStyle, color: 'red' }}>
                    <div style={availableStringStyle}>Taken</div>
                  </div>
                )}
              </>
              <div style={checkAvailabilityStyle}>
                <button type="submit" className="btn btn-primary" onClick={this.onCheckAvailabilityClick}>Check availability</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ margin: 'auto' }}>{SHOP_NAME_DESCRIPTON}</div>
        <button disabled={!isShopNameAvailable} type="submit" className="btn btn-primary" onClick={this.onShopNameSaveClick} style={{ margin: 'auto', width: 100 }}>Save</button>
      </div>
    );
  }
}

NameShop.defaultProps = {
  checkShopName: PropTypes.func,
  clearShopName: PropTypes.func,
  createShop: PropTypes.func,
  isShopNameAvailable: PropTypes.any,
};

NameShop.propTypes = {
  checkShopName: PropTypes.func,
  clearShopName: PropTypes.func,
  createShop: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  isShopNameAvailable: PropTypes.any,
};

const mapStateToProps = state => ({
  clearShopName: PropTypes.func,
  isShopNameAvailable: state.shop.isShopNameAvailable,
  myShopInfo: state.shop.myShopInfo,
});

const mapDispatchToProps = dispatch => ({
  checkShopName: shopName => dispatch(checkShopNameAction(shopName)),
  clearShopName: () => dispatch(clearShopNameAction()),
  createShop: shopName => dispatch(createShopAction(shopName)),
});


export default connect(mapStateToProps, mapDispatchToProps)(NameShop);
