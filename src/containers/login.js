import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {signInUserOauth, signInUser} from '../actions/index';

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
      emailTab: false
    }
  }

  handleFormSubmit = (values) => {
    this.props.signInUser(values);
  }

  renderField = ({input, label, type, meta: {touched, error}}) => {
    return (
      <div className={`form-group ${touched && error ? 'has-error' : ''}`}>
        <label className="control-label">{label}</label>
        <div>
          <input {...input} placeholder={label} className="form-control" type={type}/>
          {touched && error && <div className="help-block text-muted">{error}</div>}
        </div>
      </div>
    )
  }

  renderAuthError() {
    if (this.props.authError) {
      return <div className="alert alert-danger">{ this.props.authError }</div>;
    }
    return <div></div>;
  }

  toggleAuthMethod(selected, e) {
    e.preventDefault();
    selected == 'email' && this.setState({emailTab: true});
    selected == 'social' && this.setState({emailTab: false});
  }

  render() {
    return (
      <div className="col-xs-12 col-md-4 offset-md-4">

        { this.renderAuthError() }


        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs pull-xs-left">
              <li className="nav-item">
                <a
                  className={this.state.emailTab ? "nav-link" : "nav-link active"}
                  href=""
                  onClick={this.toggleAuthMethod.bind(this, 'social')}
                >Social login</a>
              </li>
              <li className="nav-item">
                <a
                  className={this.state.emailTab ? "nav-link active" : "nav-link"}
                  href=""
                  onClick={this.toggleAuthMethod.bind(this, 'email')}
                >Email login</a>
              </li>
            </ul>
          </div>
          {this.state.emailTab ?
            <div className="card-block">
              <p className="card-text text-xs-center">With supporting text below as a natural lead-in to additional content.</p>
              <div className="email-login">
                <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                  <Field name="email" component={this.renderField} type="text" label="Email"/>
                  <Field name="password" component={this.renderField} type="password" label="Password"/>

                  <button action="submit" className="btn btn-primary">Sign In</button>
                </form>
              </div>
            </div>
            :
            <div className="card-block text-xs-center">
              <p className="card-text">To post a new recommendation login with your social media account or email</p>
              <div className="social-login">
                <button className="btn btn-primary" onClick={this.props.signInUserOauth.bind(this, 'facebook')}><i className="fa fa-lg fa-fw fa-facebook"></i> Sign in with Facebook</button>
                <button className="btn btn-info" onClick={this.props.signInUserOauth.bind(this, 'twitter')}><i className="fa fa-lg fa-fw fa-twitter"></i> Sign in with Twitter</button>
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



