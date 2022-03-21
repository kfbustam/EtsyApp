import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Search as SearchIcon } from 'react-bootstrap-icons';
import {
  runFuzzySearch as runFuzzySearchAction,
  updateSearchInputText as updateSearchInputTextAction
} from './store/actions/itemAction';
import { PAGES } from './store/actions/actionTypes';
import { changePageView as changePageViewAction } from './store/actions/pageAction';

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
  bottom: 12,
  position: 'absolute',
  right: 20,
  width: 15,
  height: 15,
};

// eslint-disable-next-line react/prefer-stateless-function
class Search extends Component {
  onSearchInputChange = (e) => {
    const { updateSearchInputText } = this.props;
    updateSearchInputText(e.target.value);
  };

  onSearchClick = () => {
    const { changePageView, runFuzzySearch, searchInputText } = this.props;
    runFuzzySearch(searchInputText);
  };

  render() {
    const { placeholder, searchInputText } = this.props;
    return (
      <div style={searchInputContainerStyle}>
        <input className="form-control" type="text" placeholder={placeholder ?? 'Search for anything'} aria-label="Search" onChange={this.onSearchInputChange} style={searchInputStyle} />
        <SearchIcon style={searchIconStyle} onClick={this.onSearchClick} onKeyPress={this.onSearchClick} role="button" tabIndex="-1" />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  searchInputText: state.item.searchInputText,
});

const mapDispatchToProps = dispatch => ({
  changePageView: page => dispatch(changePageViewAction(page)),
  runFuzzySearch: searchText => dispatch(runFuzzySearchAction(searchText)),
  updateSearchInputText: searchText => dispatch(updateSearchInputTextAction(searchText)),
});

Search.defaultProps = {
  changePageView: PropTypes.func,
  placeholder: PropTypes.string || PropTypes.any,
  runFuzzySearch: PropTypes.func,
  searchInputText: PropTypes.string,
  updateSearchInputText: PropTypes.func
};

Search.propTypes = {
  changePageView: PropTypes.func,
  placeholder: PropTypes.string || PropTypes.any,
  runFuzzySearch: PropTypes.func,
  searchInputText: PropTypes.string,
  updateSearchInputText: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
