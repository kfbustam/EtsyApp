import React, { Component } from 'react';
import { connect } from 'react-redux';
import SSRProvider from 'react-bootstrap/SSRProvider';
import PropTypes from 'prop-types';
import { userLoginRequest as userLoginRequestAction } from './store/actions/userAction';

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

const loginFormControlStyle = {
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
  maxWidth: '38%',
  padding: '50px 70px 70px 71px',
  border: '2px solid black',
};

const loginFormGroupStyle = {
  marginBottom: 10,
};

const loginFormStyle = {
  textAlign: 'center',
};

const loginButtonStyle = {
  background: '#f0ad4e',
  borderColor: '#f0ad4e',
  color: '#ffffff',
  fontSize: 14,
  width: '100%',
  height: 50,
};

const signUpButtonStyle = {
  background: '#e7e7e7',
  borderColor: '#e7e7e7',
  color: '#000000',
  fontSize: 14,
  marginTop: 50,
  width: '100%',
  height: 40,
};

const errorMessageStyle = {
  color: 'red',
};

const successMessageStyle = {
  color: 'green'
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: {},
    };
  }

  render() {
    const { isAuthenticated, messages, onSignUpButtonClicked } = this.props;
    const { errorMessages } = this.state;

    const onLoginClicked = () => {
      const { userLoginRequest } = this.props;
      const { password, username } = this.state;
      userLoginRequest({
        password,
        username,
      }).then((res) => {
        this.setState({ errorMessages: res.errorMessages });
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
        <div className="container">
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" />
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />
          <div style={loginFormStyle}>
            <div style={mainDivStyle}>
              <h2 style={panelHeaderStyle}>Admin Login</h2>
              <p style={panelParagraphStyle}>
                Please enter your username and password
              </p>
              {isAuthenticated && ''}
              {errorMessages != null
                  && Object.keys(errorMessages).map(errorMessageKey => (
                    <p key={errorMessageKey} style={errorMessageStyle}>
                      {errorMessages[errorMessageKey]}
                    </p>
                  ))}
              {messages != null
                  && Object.keys(messages).map(messageKey => (
                    <p key={messageKey} style={successMessageStyle}>
                      {messages[messageKey]}
                    </p>
                  ))}
              <div style={loginFormGroupStyle}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  style={loginFormControlStyle}
                  onChange={onUsernameFieldChange}
                />
              </div>
              <div style={loginFormGroupStyle}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  style={loginFormControlStyle}
                  onChange={onPasswordFieldChange}
                />
              </div>
              <button
                style={loginButtonStyle}
                type="submit"
                onClick={onLoginClicked}
              >
                Login
              </button>
              <button
                style={signUpButtonStyle}
                type="submit"
                onClick={onSignUpButtonClicked}
              >
                Sign up
              </button>
            </div>
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
  userLoginRequest: userLoginDetails => dispatch(userLoginRequestAction(userLoginDetails))
});

Login.defaultProps = {
  isAuthenticated: PropTypes.bool,
  messages: PropTypes.string,
  onSignUpButtonClicked: PropTypes.func,
  userLoginRequest: PropTypes.func
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  messages: PropTypes.string,
  onSignUpButtonClicked: PropTypes.func,
  userLoginRequest: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
