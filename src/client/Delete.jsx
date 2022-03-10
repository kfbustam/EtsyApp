import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deleteBookRequest, queryBooks } from './store/actions/bookAction';

const deleteFormControlStyle = {
  background: '#f7f7f7 none repeat scroll 0 0',
  border: '1px solid #d4d4d4',
  borderRadius: 4,
  fontSize: 14,
  height: 50,
  lineHeight: 50,
  width: '100%'
};

const deleteFormGroupStyle = {
  marginBottom: 10,
};

const errorMessageStyle = {
  color: 'red'
};

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookID: 0,
      books: [],
      errorMessages: [],
    };
  }

  componentDidMount() {
    queryBooks().then((res) => {
      res.json().then((resp) => {
        this.setState({ books: resp.books });
      });
    });
  }

  render() {
    const { onMessageUpdated, onTabClicked } = this.props;
    const { bookID, books, errorMessages } = this.state;
    const onBookIDInputChange = (e) => {
      this.setState({ bookID: e.target.value });
    };
    const onSubmit = () => {
      deleteBookRequest({ bookID }).then((res) => {
        res.json().then((resp) => {
          if (res.ok) {
            onMessageUpdated(resp.messages);
            onTabClicked('home');
            this.setState({ books: resp.books });
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
        <div className="container">
          <h2>Delete book by ID</h2>
          <div style={deleteFormGroupStyle}>
            <input type="text" style={deleteFormControlStyle} name="bookID" onChange={onBookIDInputChange} placeholder="Book ID" required />
          </div>
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
        </div>
        <div className="container">
          <h2>List of All Books</h2>
          {
            errorMessages != null
            && Object.keys(errorMessages).map(
              errorMessageKey => <p style={errorMessageStyle}>{errorMessages[errorMessageKey]}</p>
            )
          }
          <table className="table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {books != null && Object.keys(books).map(book => (
                <tr key={`bookRow_${books[book].Title}`}>
                  <td>{book}</td>
                  <td>{books[book].Title}</td>
                  <td>{books[book].Author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

Delete.defaultProps = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
};

Delete.propTypes = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
};


export default Delete;
