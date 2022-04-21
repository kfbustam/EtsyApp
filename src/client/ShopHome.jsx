import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ShopEdit from './ShopEdit';
import NameShop from './NameShop';
import { hydrateShopInfo as hydrateShopInfoAction } from './store/actions/shopAction';

class ShopHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
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


  render() {
    const {
      myShopInfo
    } = this.props;

    return (
      <>{myShopInfo.length === 0 ? <NameShop /> : <ShopEdit myShopInfo={myShopInfo[0]} />}</>
    );
  }
}

ShopHome.defaultProps = {
  hydrateShopInfo: PropTypes.func,
  myShopInfo: PropTypes.array,
};

ShopHome.propTypes = {
  hydrateShopInfo: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  myShopInfo: PropTypes.array,
};

const mapStateToProps = state => ({
  myShopInfo: state.shop.myShopInfo,
});

const mapDispatchToProps = dispatch => ({
  hydrateShopInfo: () => dispatch(hydrateShopInfoAction()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopHome);
