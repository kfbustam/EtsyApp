import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Search as SearchIcon } from 'react-bootstrap-icons';

const searchInputContainerStyle = {
  margin: 'auto',
  position: 'relative',
  width: '90%'
};

const searchInputStyle = {
  borderRadius: 25,
  margin: '5px 0px 0px 0px',
  paddingLeft: 20,
  position: 'relative',
};

const searchIconStyle = {
  bottom: 15,
  position: 'absolute',
  right: 20,
  width: 10,
  height: 10,
};

// eslint-disable-next-line react/prefer-stateless-function
class Search extends Component {
  onSearchInputChange = (e) => {
    const { changeSearchInputResult } = this.props;
    this.debounce(() => {
      changeSearchInputResult(e.target.value);
    }, 3000);
  };

  debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  render() {
    const { placeholder } = this.props;
    return (
      <div style={searchInputContainerStyle}>
        <input className="form-control" type="text" placeholder={placeholder ?? 'Search for anything'} aria-label="Search" onChange={this.onSearchInputChange} style={searchInputStyle} />
        <SearchIcon style={searchIconStyle} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  changeSearchInputResult: userLoginDetails => dispatch(changeSearchInputResultAction(userLoginDetails))
});

Search.defaultProps = {
  changeSearchInputResult: PropTypes.func,
  placeholder: PropTypes.string || PropTypes.any
};

Search.propTypes = {
  changeSearchInputResult: PropTypes.func,
  placeholder: PropTypes.string || PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
