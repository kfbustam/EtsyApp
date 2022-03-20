import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FavoriteItemsNavBar from './FavoriteItemsNavBar';
import FavoriteItem from './FavoriteItem';

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

const errorMessageStyle = {
  color: 'red'
};

class FavoriteItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookAuthor: '',
      bookID: 0,
      bookTitle: '',
      errorMessages: [],
    };
  }


  render() {
    const { onTabClicked, onMessageUpdated } = this.props;
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
    const favoriteItems = [];
    return (
      <>
        {
          errorMessages != null
          && Object.keys(errorMessages).map(
            errorMessageKey => <p style={errorMessageStyle}>{errorMessages[errorMessageKey]}</p>
          )
        }
        <div className="container">
          <FavoriteItemsNavBar />
          <div>
            {favoriteItems.map(favoriteItem => <FavoriteItem favoriteItem={favoriteItem} />)}
          </div>
        </div>
      </>
    );
  }
}

FavoriteItems.defaultProps = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
};

FavoriteItems.propTypes = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
};

export default FavoriteItems;
