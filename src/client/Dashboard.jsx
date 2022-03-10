import React, { Component } from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import TabGroup from './TabGroup';
import Create from './Create';
import Delete from './Delete';
import Header from './Header';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'home',
      isOnSignUpPage: false,
    };
  }

  render() {
    const { activeTab, isOnSignUpPage, messages } = this.state;
    const onTabClicked = (newActiveTab) => {
      this.setState({ activeTab: newActiveTab });
    };
    const onMessageUpdated = (newMessages) => {
      this.setState({ messages: newMessages });
    };
    const onSignUpButtonClicked = (isOnSignUpPageFlag) => {
      this.setState({ isOnSignUpPage: isOnSignUpPageFlag });
    };
    const { isAuthenticated } = this.props;
    const authComponent = (isOnSignUpPage
      ? <SignUp onMessageUpdated={onMessageUpdated} onSignUpButtonClicked={onSignUpButtonClicked} />
      : <Login messages={messages} onSignUpButtonClicked={onSignUpButtonClicked} />);
    let defaultComponent;
    switch (activeTab) {
      case 'create':
        defaultComponent = <Create onMessageUpdated={onMessageUpdated} onTabClicked={onTabClicked} />;
        break;
      case 'delete':
        defaultComponent = <Delete onMessageUpdated={onMessageUpdated} onTabClicked={onTabClicked} />;
        break;
      default:
        defaultComponent = <Home messages={messages} />;
        break;
    }
    return (
      <SSRProvider>
        <div className="container">
          {isAuthenticated && <Header />}
          {isAuthenticated && <TabGroup activeTab={activeTab} onTabClicked={onTabClicked} />}
        </div>
        { isAuthenticated
          ? defaultComponent
          : authComponent
        }
      </SSRProvider>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
});

Dashboard.defaultProps = {
  isAuthenticated: PropTypes.bool,
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps)(Dashboard);
