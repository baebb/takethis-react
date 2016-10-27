import React from 'react';
import {connect} from 'react-redux';
import {signInUserOauth, signInUserEmail, signUpUserEmail} from '../actions/index';

import SocialLogin from '../components/social_login';
import EmailLogin from '../components/email_login';
import EmailSignup from '../components/email_signup';

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

  render() {
    return (
      <div className="col-xs-12 col-md-4 offset-md-4">
        {this.props.authError ?
          <div className="alert alert-danger">{this.props.authError}</div>
          :
          null}
        <div className="card">
          {this.props.auth_loading &&
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
    auth_loading: state.auth.auth_loading,
    authError: state.auth.error
  }
}

export default Login = connect(mapStateToProps, {signInUserEmail, signUpUserEmail, signInUserOauth})(Login);



