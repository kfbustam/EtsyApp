import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { queryBooks } from './store/actions/bookAction';

const successMessageStyle = {
  color: 'green'
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
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
    const { messages } = this.props;
    const { books } = this.state;
    const msgElem = messages != null
      && Object.keys(messages).map(
        messageKey => <p style={successMessageStyle}>{messages[messageKey]}</p>
      );
    return (
      <>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />
        <div className="container">
          <h2>List of All Books</h2>
          {
            msgElem
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

Home.defaultProps = {
  messages: PropTypes.array
};

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  messages: PropTypes.array
};

export default Home;
