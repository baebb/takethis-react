import React from 'react';
import {Field, reduxForm} from 'redux-form';

import TextField from './text_field';

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
          <Field name="email" component={TextField} type="text" label="Email"/>
          <Field name="password" component={TextField} type="password" label="Password"/>
          <div className="row">
            <div className="col-xs-6">
              <a onClick={this.props.toggleCurrentTab.bind(this, 'signup')} className="text-muted">
                <small>Sign up</small>
              </a>
              <br />
              <a onClick={this.props.toggleCurrentTab.bind(this, 'forgotPass')} className="text-muted">
                <small>Forgot password?</small>
              </a>
            </div>
            <div className="col-xs-6">
              <button type="submit" className="btn btn-success pull-xs-right">Log in</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default EmailLogin = reduxForm({
  form: 'email_login',
  validate
})(EmailLogin);