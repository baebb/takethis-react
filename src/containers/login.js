import React from 'react';
import {connect} from 'react-redux';
import {signInUserOauth, signInUser} from '../actions/index';

import SocialLogin from '../components/social_login';
import EmailLogin from '../components/email_login';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpTab: false
    }
  }

  handleFormSubmit = (values) => {
    this.props.signInUser(values);
  }

  toggleSignUp(selected, e) {
    e.preventDefault();
    selected == 'signup' && this.setState({signUpTab: true});
    selected == 'login' && this.setState({signUpTab: false});
  }

  render() {
    return (
      <div className="col-xs-12 col-md-4 offset-md-4">
        {this.props.authError ?
          <div className="alert alert-danger">{this.props.authError}</div>
          :
          null}
        <div className="card">
          {this.state.signUpTab ?
            <div className="signup-tab card-block">
              <p className="card-text text-xs-left">With supporting text below as a natural lead-in to additional
                content.</p>
              <a onClick={this.toggleSignUp.bind(this, 'login')} className="text-muted">
                <small>Log in</small>
              </a>
            </div>
            :
            <div className="login-tab card-block text-xs-left">
              <h4 className="card-title">Log in to Take This</h4>
              <SocialLogin signInUserOauth={this.props.signInUserOauth.bind(this)}/>
              <div className="h-divider"/>
              <EmailLogin onSubmit={this.handleFormSubmit} toggleSignUp={this.toggleSignUp.bind(this, 'signup')}/>
            </div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authError: state.auth.error
  }
}

export default Login = connect(mapStateToProps, {signInUser, signInUserOauth})(Login);



