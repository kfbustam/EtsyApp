import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvailabileIcon from './AvailableIcon';

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

const searchInputContainerStyle = {
  position: 'relative',
  padding: 0,
  margin: 0,
  width: '80%'
};

const searchInputStyle = {
  position: 'relative',
  paddingLeft: 30
};

const searchIconStyle = {
  position: 'absolute',
  bottom: 16,
  right: 10,
  width: 10,
  height: 10,
};


const errorMessageStyle = {
  color: 'red'
};

class ItemContainer extends Component {
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
    return (
      <>
        {
          errorMessages != null
          && Object.keys(errorMessages).map(
            errorMessageKey => <p style={errorMessageStyle}>{errorMessages[errorMessageKey]}</p>
          )
        }
        <div className="container">
          <h2>Name your shop</h2>
          <h2>Choose a memorable name that reflects your style.</h2>
          <div style={searchInputContainerStyle}>
            <input className="form-control" type="text" placeholder="Type the name of your shop" aria-label="Search" onChange={this.onSearchInputChange} style={searchInputStyle} />
            <AvailabileIcon style={searchIconStyle} />
            <div>Check availability</div>
          </div>
          <div>
            Your shop name will appear in your shop and next to each of your listings throughout Etsy. After you open your shop, you can change your name once.
          </div>
        </div>
      </>
    );
  }
}

ItemContainer.defaultProps = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
};

ItemContainer.propTypes = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
};

export default ItemContainer;
