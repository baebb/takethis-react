import React from 'react';
import {Field, reduxForm} from 'redux-form';

import LoginField from './login_field';

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

class EmailLogin extends React.Component {
  render() {
    return (
      <div className="email-login">
        <form onSubmit={this.props.handleSubmit}>
          <Field name="email" component={LoginField} type="text" label="Email"/>
          <Field name="password" component={LoginField} type="password" label="Password"/>
          <a onClick={this.props.toggleSignUp} className="text-muted">
            <small>Sign up</small>
          </a>
          <button type="submit" className="btn btn-success pull-xs-right">Log in</button>
        </form>
      </div>
    )
  }
}

export default EmailLogin = reduxForm({
  form: 'email_login',
  validate
})(EmailLogin);