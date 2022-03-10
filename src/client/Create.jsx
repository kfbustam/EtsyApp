import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createBookRequest } from './store/actions/bookAction';

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

class Create extends Component {
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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />
        {
          errorMessages != null
          && Object.keys(errorMessages).map(
            errorMessageKey => <p style={errorMessageStyle}>{errorMessages[errorMessageKey]}</p>
          )
        }
        <div className="container">
          <h2>Create a Book</h2>
          <div style={createFormGroupStyle}>
            <input type="text" style={createFormControlStyle} name="bookID" onChange={onBookIDInputChange} placeholder="Book ID" pattern="[A-Za-z0-9]+" required />
          </div>
          <div style={createFormGroupStyle}>
            <input type="text" style={createFormControlStyle} name="bookTitle" onChange={onBookAuthorTitleInputChange} placeholder="Title" required />
          </div>
          <div style={createFormGroupStyle}>
            <input type="text" style={createFormControlStyle} name="bookAuthor" onChange={onBookAuthorNameInputChange} placeholder="Author" required />
          </div>
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
        </div>
      </>
    );
  }
}

Create.defaultProps = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
};

Create.propTypes = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
};

export default Create;
