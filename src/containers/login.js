import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {signInUserOauth, signInUser} from '../actions/index';

import SocialLogin from '../components/social_login';
import LoginField from '../components/login_field';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};

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

  renderAuthError() {
    return (
      this.props.authError ?
        <div className="alert alert-danger">{this.props.authError}</div>
        :
        <div></div>
    )
  }

  toggleSignUp(selected, e) {
    e.preventDefault();
    selected == 'login' && this.setState({signUpTab: true});
    selected == 'signup' && this.setState({signUpTab: false});
  }

  render() {
    return (
      <div className="col-xs-12 col-md-4   offset-md-4">

        { this.renderAuthError() }


        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs pull-xs-left">
              <li className="nav-item">
                <a
                  className={this.state.signUpTab ? "nav-link" : "nav-link active"}
                  href=""
                  onClick={this.toggleSignUp.bind(this, 'login')}
                >Login</a>
              </li>
              <li className="nav-item">
                <a
                  className={this.state.signUpTab ? "nav-link active" : "nav-link"}
                  href=""
                  onClick={this.toggleSignUp.bind(this, 'signup')}
                >Sign up</a>
              </li>
            </ul>
          </div>
          {this.state.signUpTab ?
            <div className="signup-tab">
              <div className="card-block">
                <p className="card-text text-xs-left">With supporting text below as a natural lead-in to additional
                  content.</p>
              </div>
            </div>
            :
            <div className="login-tab">
              <div className="card-block text-xs-left">
                <h4 className="card-title">Log in to Take This</h4>
                <SocialLogin signInUserOauth={this.props.signInUserOauth.bind(this)}/>
                <div className="h-divider"/>
                <div className="email-login">
                  <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                    <Field name="email" component={LoginField} type="text" label="Email"/>
                    <Field name="password" component={LoginField} type="password" label="Password"/>
                    <button type="submit" className="btn btn-success pull-xs-right">Log in</button>
                  </form>
                </div>
              </div>
            </div>
          }
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

Login = reduxForm({
  form: 'login',
  validate
})(Login);

export default Login = connect(mapStateToProps, {signInUser, signInUserOauth})(Login);



