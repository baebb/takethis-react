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

  return errors;
}

class ForgotPass extends React.Component {
  render() {
    return (
      <div className="forgot-pass text-xs-center">
        <form onSubmit={this.props.handleSubmit}>
          <Field name="email" component={TextField} type="text" label="Email"/>
          <button type="submit" className="btn btn-primary btn-block">Reset password</button>
          <a onClick={this.props.toggleCurrentTab.bind(this, 'login')} className="text-muted">
            <small>go back to Log in</small>
          </a>
        </form>
      </div>
    )
  }
}

export default ForgotPass = reduxForm({
  form: 'forgot_pass',
  validate
})(ForgotPass);