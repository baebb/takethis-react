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

  toggleSignUp(selected, e) {
    e.preventDefault();
    selected == 'signup' && this.setState({currentTab: 'signup'});
    selected == 'login' && this.setState({currentTab: 'login'});
    selected == 'forgotPass' && this.setState({currentTab: 'forgotPass'});
  }

  render() {
    return (
      <div className="col-xs-12 col-md-4 offset-md-4">
        {this.props.authError ?
          <div className="alert alert-danger">{this.props.authError}</div>
          :
          null}
        <div className="card">
          {this.props.attempt_auth &&
          <div className="loading">
            <img src="../../img/spinner.svg" className="m-x-auto d-block" />
          </div>}
          {this.state.currentTab === 'signup' ?
            <div className="signup-tab card-block text-xs-left">
              <h4 className="card-title">Create an account</h4>
              <SocialLogin signInUserOauth={this.props.signInUserOauth.bind(this)}/>
              <div className="h-divider"/>
              <EmailSignup onSubmit={this.handleSignupFormSubmit} toggleSignUp={this.toggleSignUp.bind(this)}/>
            </div>
            : (this.state.currentTab === 'login' ?
              <div className="login-tab card-block text-xs-left">
                <h4 className="card-title">Log in to Take This</h4>
                <SocialLogin signInUserOauth={this.props.signInUserOauth.bind(this)}/>
                <div className="h-divider"/>
                <EmailLogin onSubmit={this.handleLoginFormSubmit} toggleSignUp={this.toggleSignUp.bind(this)}/>
              </div>
            :
              <div className="card-block text-xs-left">
                <h4 className="card-title">Reset your password</h4>
              </div>
          )
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    attempt_auth: state.auth.attempt_auth,
    authError: state.auth.error
  }
}

export default Login = connect(mapStateToProps, {signInUserEmail, signUpUserEmail, signInUserOauth})(Login);



