import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PencilFill, Camera } from 'react-bootstrap-icons';

const errorMessageStyle = {
  color: 'red'
};

const iconStyle = {
  height: 20,
  width: 40,
  margin: 'auto 6px',
};

class ProfileSection extends Component {
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
    const username = 'USER NAME';
    const followingCount = 0;
    const followersCount = 0;
    const profilePictureURL = 'https://example.com';
    return (
      <>
        {
          errorMessages != null
          && Object.keys(errorMessages).map(
            errorMessageKey => <p style={errorMessageStyle}>{errorMessages[errorMessageKey]}</p>
          )
        }
        <div className="container">
          <img style={iconStyle} src={profilePictureURL} alt="Logo" />
          <Camera />
          <div>{username}</div>
          <div>{`${followingCount} Following`}</div>
          <div>{`${followersCount} Followers`}</div>
          <PencilFill />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
});

const mapDispatchToProps = dispatch => ({
  userSignUpRequest: userSignUpDetails => dispatch(userSignUpRequestAction(userSignUpDetails))
});

ProfileSection.defaultProps = {
  username: PropTypes.string,
};

ProfileSection.propTypes = {
  username: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);
