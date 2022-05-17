import React, { Component } from 'react';
import { connect } from 'react-redux';
import SSRProvider from 'react-bootstrap/SSRProvider';
import PropTypes from 'prop-types';
import { userSignupRequest as userSignUpRequestAction } from './store/actions/userAction';
import { changePageView as changePageViewAction } from './store/actions/pageAction';
import { PAGES } from './store/actions/actionTypes';

const panelHeaderStyle = {
  color: '#444444',
  fontSize: 18,
  margin: '0 0 8px 0',
};

const panelParagraphStyle = {
  color: '#777777',
  fontSize: 14,
  marginBottom: 30,
};

const signUpFormInputStyle = {
  background: '#f7f7f7 none repeat scroll 0 0',
  border: '1px solid #d4d4d4',
  borderRadius: 4,
  fontSize: 14,
  height: 50,
  lineHeight: 50,
  width: '100%',
};

const mainDivStyle = {
  background: '#ffffff none repeat scroll 0 0',
  borderRadius: 2,
  margin: '10px auto 30px',
  padding: '50px 70px 70px 71px',
  border: '2px solid black',
};

const SignUpFormGroupStyle = {
  marginBottom: 10,
};

const SignUpFormStyle = {
  textAlign: 'center',
};

const SignUpButtonStyle = {
  background: '#f0ad4e',
  borderColor: '#f0ad4e',
  color: '#ffffff',
  fontSize: 14,
  width: '100%',
  height: 50,
};

const errorMessageStyle = {
  color: 'red',
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: {},
    };
  }

  render() {
    const {
      changePageView,
      isAuthenticated,
      onMessageUpdated,
      userSignUpRequest
    } = this.props;
    const { errorMessages, password, username } = this.state;

    const onSignUpClicked = () => {
      userSignUpRequest({
        password,
        username,
      }).then((res) => {
        res.json().then((resp) => {
          if ('errorMessages' in resp && Object.keys(resp.errorMessages).length === 0) {
            onMessageUpdated(resp.messages);
            changePageView(PAGES.HOME);
          }
          this.setState({ errorMessages: resp.errorMessages });
        });
      });
    };

    const onUsernameFieldChange = (evt) => {
      this.setState({
        username: evt.target.value,
      });
    };

    const onPasswordFieldChange = (evt) => {
      this.setState({
        password: evt.target.value,
      });
    };

    return (
      <SSRProvider>
        <div style={SignUpFormStyle}>
          <div style={mainDivStyle}>
            <h2 style={panelHeaderStyle}>Sign Up</h2>
            <p style={panelParagraphStyle}>
              Please enter a username and password
            </p>
            {isAuthenticated && ''}
            {errorMessages != null
              && Object.keys(errorMessages).map(errorMessageKey => (
                <p key={errorMessageKey} style={errorMessageStyle}>
                  {errorMessages[errorMessageKey]}
                </p>
              ))}
            <div style={SignUpFormGroupStyle}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                style={signUpFormInputStyle}
                onChange={onUsernameFieldChange}
              />
            </div>
            <div style={SignUpFormGroupStyle}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                style={signUpFormInputStyle}
                onChange={onPasswordFieldChange}
              />
            </div>
            <button
              style={SignUpButtonStyle}
              type="submit"
              onClick={onSignUpClicked}
            >
              Submit
            </button>
          </div>
        </div>
      </SSRProvider>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  changePageView: userLoginDetails => dispatch(changePageViewAction(userLoginDetails)),
  userSignUpRequest: userSignUpDetails => dispatch(userSignUpRequestAction(userSignUpDetails))
});

SignUp.defaultProps = {
  changePageView: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  onMessageUpdated: PropTypes.func,
  onSignUpButtonClicked: PropTypes.func,
  userSignUpRequest: PropTypes.func
};

SignUp.propTypes = {
  changePageView: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  onMessageUpdated: PropTypes.func,
  onSignUpButtonClicked: PropTypes.func,
  userSignUpRequest: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
