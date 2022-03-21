import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { changePageView as changeCurrentViewAction } from '../store/actions/pageAction';


const navStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
};

const linkStyle = {
  color: 'black',
  whiteSpace: 'no-wrap',
  fontSize: 'small'
};

const CATEGORIES = [
  { label: 'Valentine\'s Day Gifts' },
  { label: 'Jewelry & Accessories' },
  { label: 'Clothing & Shoes' },
  { label: 'Home & Living' },
  { label: 'Wedding & Party' },
  { label: 'Toys & Entertainment' },
  { label: 'Art & Collectibles' },
  { label: 'Craft Supplies' },
  { label: 'Gifts & Gift Cards' },
];

// eslint-disable-next-line react/prefer-stateless-function
class CategoryBar extends Component {
  render() {
    // const onLogoutClicked = () => {
    //   const { changeCurrentView } = this.props;
    //   changeCurrentView();
    // };

    return (
      <Nav style={navStyle}>
        {CATEGORIES.map(category => (
          <Nav.Link href={`#${category.label}`} key={category.label} style={linkStyle}>{category.label}</Nav.Link>
        ))}
      </Nav>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  changeCurrentView: userLoginDetails => dispatch(changeCurrentViewAction(userLoginDetails)),
});

CategoryBar.defaultProps = {
  changeCurrentView: PropTypes.func,
};

CategoryBar.propTypes = {
  changeCurrentView: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBar);
