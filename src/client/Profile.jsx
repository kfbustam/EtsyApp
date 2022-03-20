import React, { Component } from 'react';
import PropTypes from 'prop-types';


const citySectionStyle = {

};

const createFormControlStyle = {
  background: '#f7f7f7 none repeat scroll 0 0',
  border: '1px solid #d4d4d4',
  borderRadius: 4,
  fontSize: 14,
  height: 50,
  lineHeight: 50,
  width: '100%'
};

const profilePictureSectionStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const errorMessageStyle = {
  color: 'red'
};

const profilePageHeaderContainerStyle = {
  display: 'flex',
  flexDirection: 'row'
};

const profilePageHeaderTitleStyle = {
};

const yourNameSectionStyle = {

};

const profilePageHeaderViewProfileStyle = {};

const genderSectionStyle = {
  display: 'flex',
  flexDirection: 'row'
};

const birthdaySectionStyle = {
  display: 'flex',
  flexDirection: 'row'
};

const aboutSectionStyle = {

};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = [
  '1'
];

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: null,
      src: '',
      errorMessages: [],
    };
  }

  handlePictureSelected(event) {
    const picture = event.target.files[0];
    const src = URL.createObjectURL(picture);

    this.setState({
      picture,
      src
    });
  }

  render() {
    const { onTabClicked, onMessageUpdated, profileInfo } = this.props;
    const { username } = profileInfo;
    const {
      errorMessages,
      src,
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
          <div style={profilePageHeaderContainerStyle}>
            <div style={profilePageHeaderTitleStyle}>
              <h2>Your Public Profile</h2>
              <h2>Everything on this page can be seen by everyone</h2>
            </div>
            <div style={profilePageHeaderViewProfileStyle}>
              <button type="submit" className="btn btn-primary" onClick={onSubmit}>View Profile</button>
            </div>
          </div>
          <div style={profilePictureSectionStyle}>
            <div>
              <div>
                Profile Picture
              </div>
              <input
                type="file"
                onChange={this.handlePictureSelected.bind(this)}
              />
              {src == null && 'No file chosen'}
            </div>
            <img alt="profile" src={src} />
            <div>
              Must be a .jpg, .gif or .png file smaller than 10MB and at least 400px by 400px.
            </div>
          </div>
          <div style={yourNameSectionStyle}>
            <div>Your Name</div>
            <div>{username}</div>
          </div>
          <div style={genderSectionStyle}>
            <div>Gender</div>
            <input type="radio" value="Female" />
            <input type="radio" value="Male" />
            <input type="radio" value="Rather not say" />
            <input type="radio" value="Custom" />
          </div>
          <div style={citySectionStyle}>
            <div>City</div>
            <input type="text" />
            <div>Start typing and choose from a suggested city to help other find you.</div>
          </div>
          <div style={birthdaySectionStyle}>
            <div>Birthday</div>
            <select name="month" id="month">
              {MONTHS.map(month => <option value={month}>month</option>)}
            </select>
            <select name="day" id="day">
              {DAYS.map(day => <option value={day}>day</option>)}
            </select>
          </div>
          <div style={aboutSectionStyle}>
            <div>About</div>
            <input type="text" />
            <div>Tell people a little about yourself.</div>
          </div>


          <button type="submit" className="btn btn-primary" onClick={onSubmit}>Save Changes</button>
        </div>
      </>
    );
  }
}

Profile.defaultProps = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
  profileInfo: PropTypes.object,
};

Profile.propTypes = {
  onMessageUpdated: PropTypes.func,
  onTabClicked: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  profileInfo: PropTypes.object,
};

export default Profile;
