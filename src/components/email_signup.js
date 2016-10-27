import React from 'react';
import {Field, reduxForm} from 'redux-form';

import TextField from './text_field';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Please enter a password confirmation.";
  }

  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords do not match';
  }

  return errors;
}

class EmailSignup extends React.Component {
  render() {
    return (
      <div className="email-signup">
        <form onSubmit={this.props.handleSubmit}>
          <Field name="email" component={TextField} type="text" label="Email"/>
          <Field name="password" component={TextField} type="password" label="Password"/>
          <Field name="passwordConfirm" component={TextField} type="password" label="Re-enter password" />
          <a onClick={this.props.toggleCurrentTab.bind(this, 'login')} className="text-muted">
            <small>Log in</small>
          </a>
          <button action="submit" className="btn btn-primary pull-xs-right">Sign up</button>
        </form>
      </div>
    )
  }
}

export default EmailSignup = reduxForm({
  form: 'email_signup',
  validate
})(EmailSignup);