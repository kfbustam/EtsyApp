import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { PersonCircle } from 'react-bootstrap-icons';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { connect } from 'react-redux';
import { getUserInfo as getUserInfoAction, updateUserInfo as updateUserInfoAction } from './store/actions/userAction';

const citySectionStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const profilePictureSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  width: '100%'
};

const errorMessageStyle = {
  color: 'red'
};

const profilePageHeaderContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
};

const profilePageHeaderTitleStyle = {
};

const yourNameSectionStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: 15
};

const profilePageHeaderViewProfileStyle = {};

const genderSectionStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: 15
};

const birthdaySectionStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: 15
};

const aboutSectionStyle = {
  display: 'flex',
  flexDirection: 'column'
};
class Profile extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    const {
      about,
      birthday,
      city,
      username,
      src,
    } = user;
    this.state = {
      about,
      birthday,
      city,
      gender: 'custom',
      isUsernameBeingEdited: false,
      picture: null,
      src,
      username,
      errorMessages: [],
    };
  }

  componentDidMount() {
    const { getUserInfo } = this.props;
    getUserInfo();
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
    const {
      updateUserInfo,
    } = this.props;
    const {
      errorMessages,
      isUsernameBeingEdited,
      username,
      about,
      birthday,
      city,
      gender,
      picture,
      src,
    } = this.state;
    const onViewProfileClick = () => {
    };
    const onGenderChange = (e, changedIndex) => {
      this.setState({ gender: changedIndex });
    };
    const onAboutChange = (e) => {
      this.setState({ about: e.target.value });
    };
    const onCityChange = (e) => {
      this.setState({ city: e.target.value });
    };
    const onBirthdayChange = (e) => {
      this.setState({ birthday: e.toISOString() });
    };
    const onChangeUsernameClick = () => {
      this.setState({ isUsernameBeingEdited: true });
    };
    const onUsernameChange = (e) => {
      this.setState({ username: e.target.value });
    };
    const onSaveUsernameClick = () => {
      this.setState({ isUsernameBeingEdited: false });
    };
    const onRemoveUsernameClick = () => {
      this.setState({ username: '' });
    };

    const onSaveChangesClick = () => {
      updateUserInfo({
        username,
        about,
        birthday,
        city,
        gender,
        picture,
        src,
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
        <Container>
          <div style={profilePageHeaderContainerStyle}>
            <div style={profilePageHeaderTitleStyle}>
              <h2>Your Public Profile</h2>
              <div style={{ fontSize: 20, color: '#9c9c9c' }}>Everything on this page can be seen by everyone</div>
            </div>
            <div style={profilePageHeaderViewProfileStyle}>
              <button type="submit" className="btn btn-primary" onClick={onViewProfileClick}>View Profile</button>
            </div>
          </div>
        </Container>
        <Container
          style={{
            borderTop: '1px solid #9c9c9c',
            borderBottom: '1px solid #9c9c9c',
            borderRight: '1px solid #9c9c9c',
            borderLeft: '1px solid #9c9c9c'
          }}
        >
          <div style={{ margin: 20 }}>
            <div style={profilePictureSectionStyle}>
              <div style={{ gap: 15 }}>
                <div style={{ fontWeight: 500 }}>
                  Profile Picture
                </div>
                <input
                  type="file"
                  onChange={this.handlePictureSelected.bind(this)}
                />
              </div>
              {src != null ? <img alt="profile" src={src} style={{ height: 100, width: 100 }} /> : <PersonCircle style={{ height: 70, width: 70 }} />}
              <div>
                Must be a .jpg, .gif or .png file smaller than 10MB and at least 400px by 400px.
              </div>
            </div>
            <hr className="solid" />
            <div style={yourNameSectionStyle}>
              <div style={{ fontWeight: 500 }}>Your Name</div>
              {
                isUsernameBeingEdited
                  ? <input type="text" onChange={onUsernameChange} defaultValue={username} />
                  : (
                    <div style={{ color: '#9c9c9c' }}>
                      {username ?? 'You currently do no have a username set'}
                    </div>
                  )
              }
              {
                isUsernameBeingEdited
                  ? <Button onClick={onSaveUsernameClick}>Save</Button>
                  : <Button onClick={onChangeUsernameClick}>Change</Button>
              }
              <Button onClick={onRemoveUsernameClick}>Remove</Button>
            </div>
            <hr className="solid" />
            <div style={genderSectionStyle}>
              <div style={{ fontWeight: 500 }}>Gender</div>
              <div style={{ display: 'flex', flexDirection: 'row', margin: 'auto 0px auto 0px', gap: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                  <input checked={gender === 'female'} key="female" type="radio" value="Female" onChange={e => onGenderChange(e, 'female')} style={{ margin: 'auto 0px auto 0px' }} />
                  <span>Female</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                  <input checked={gender === 'male'} key="male" type="radio" value="Male" onChange={e => onGenderChange(e, 'male')} style={{ margin: 'auto 0px auto 0px' }} />
                  <span>Male</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                  <input checked={gender === 'rathernotsay'} key="rathernotsay" type="radio" value="Rather not say" onChange={e => onGenderChange(e, 'rathernotsay')} style={{ margin: 'auto 0px auto 0px' }} />
                  <span>Rather not say</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                  <input checked={gender === 'custom'} key="custom" onChange={e => onGenderChange(e, 'custom')} type="radio" value="Custom" style={{ margin: 'auto 0px auto 0px' }} />
                  <span>Custom</span>
                </div>
              </div>
            </div>
            <hr className="solid" />
            <div style={citySectionStyle}>
              <div
                style={{
                  display: 'flex', flexDirection: 'row', gap: 15
                }}
              >
                <div style={{ fontWeight: 500 }}>City</div>
                <input type="text" onChange={onCityChange} value={city} />
              </div>
              <div style={{ color: '#9c9c9c' }}>Start typing and choose from a suggested city to help other find you.</div>
            </div>
            <hr className="solid" />
            <div style={birthdaySectionStyle}>
              <div style={{ fontWeight: 500 }}>Birthday</div>
              <Datetime inputProps={{ placeholder: 'Click to add your birthday' }} onChange={onBirthdayChange} value={birthday} />
            </div>
            <hr className="solid" />
            <div style={aboutSectionStyle}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
                <div style={{ fontWeight: 500 }}>About</div>
                <textarea name="About" cols="40" rows="5" value={about} onChange={onAboutChange} />
              </div>
              <div style={{ color: '#9c9c9c' }}>Tell people a little about yourself.</div>
            </div>
          </div>
        </Container>
        <button type="submit" className="btn btn-primary" onClick={onSaveChangesClick} style={{ margin: '5% 10% 0% 20%' }}>
          Save Changes
        </button>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(getUserInfoAction()),
  updateUserInfo: userInfo => dispatch(updateUserInfoAction(userInfo))
});

Profile.defaultProps = {
  getUserInfo: PropTypes.func,
  updateUserInfo: PropTypes.func,
  user: PropTypes.object,
};

Profile.propTypes = {
  getUserInfo: PropTypes.func,
  updateUserInfo: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);