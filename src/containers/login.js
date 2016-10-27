import React from 'react';
import {connect} from 'react-redux';
import {signInUserOauth, signInUserEmail, signUpUserEmail, resetUserPass} from '../actions/index';

import SocialLogin from '../components/social_login';
import EmailLogin from '../components/email_login';
import EmailSignup from '../components/email_signup';
import ForgotPass from '../components/forgot_pass';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'login'
    }
  }

  handleLoginFormSubmit = (values) => {
    this.props.signInUserEmail(values);
  }

  handleSignupFormSubmit = (values) => {
    this.props.signUpUserEmail(values);
  }

  handleResetPassFormSubmit = (email) => {
    this.props.resetUserPass(email);
  }

  toggleCurrentTab(selected, e) {
    e.preventDefault();
    selected == 'signup' && this.setState({currentTab: 'signup'});
    selected == 'login' && this.setState({currentTab: 'login'});
    selected == 'forgotPass' && this.setState({currentTab: 'forgotPass'});
  }

  renderCurrentTab() {
    switch (this.state.currentTab) {
      case 'signup':
        return (
          <div className="signup-tab card-block text-xs-left">
            <h4 className="card-title">Create an account</h4>
            <SocialLogin signInUserOauth={this.props.signInUserOauth.bind(this)}/>
            <div className="h-divider"/>
            <EmailSignup onSubmit={this.handleSignupFormSubmit} toggleCurrentTab={this.toggleCurrentTab.bind(this)}/>
          </div>
        )
      case 'forgotPass':
        return (
          <div className="card-block text-xs-left">
            <h4 className="card-title">Reset your password</h4>
            <ForgotPass onSubmit={this.handleResetPassFormSubmit} toggleCurrentTab={this.toggleCurrentTab.bind(this)}/>
          </div>
        )
      default:
        return (
          <div className="login-tab card-block text-xs-left">
            <h4 className="card-title">Log in to Take This</h4>
            <SocialLogin signInUserOauth={this.props.signInUserOauth.bind(this)}/>
            <div className="h-divider"/>
            <EmailLogin onSubmit={this.handleLoginFormSubmit} toggleCurrentTab={this.toggleCurrentTab.bind(this)}/>
          </div>
        )
    }
  }

  renderErrorMessage() {
    if (this.props.authMessage) {
      // console.log('messageType:',this.props.authMessageType);
      let messageType;
      switch (this.props.authMessageType) {
        case 'success':
          messageType = "success";
          break;
        case 'error':
          messageType = "danger"
          break;
        default:
          messageType = "danger";
          break;
      }
      return (
        <div className={"alert alert-" + messageType}>{this.props.authMessage}</div>
      )
    }
    else {
      return null;
    }
  }

  render() {
    return (
      <div className="col-xs-12 col-md-4 offset-md-4">
        {this.renderErrorMessage()}
        <div className="card">
          {this.props.authLoading &&
          <div className="loading">
            <img src="../../img/spinner.svg" className="m-x-auto d-block"/>
          </div>}
          {this.renderCurrentTab()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authLoading: state.auth.authLoading,
    authMessage: state.auth.authMessage,
    authMessageType: state.auth.authMessageType
  }
}

export default Login =
  connect(mapStateToProps, {signInUserEmail, signUpUserEmail, signInUserOauth, resetUserPass})(Login);



