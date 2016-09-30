import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {signUpUserEmail} from '../actions/index';

const validate = (values) => {
  const errors = {};
  console.log(errors);
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

class Signup extends React.Component {
  handleFormSubmit = (props) => {
    this.props.signUpUserEmail(props);
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
      return (
        <div className="alert alert-danger">{this.props.authError}</div>
      )
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-4 offset-md-4">
          <h2 className="text-center">Sign Up</h2>
          {this.renderAuthError()}
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field name="email" type="text" component={this.renderField} label="Email"/>
            <Field name="password" type="password" component={this.renderField} label="Password"/>
            <Field name="passwordConfirm" type="password" component={this.renderField} label="Re-type password"/>
            <button action="submit" className="btn btn-primary m-x-auto">Sign up</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authError: state.auth.error
  }
}

Signup = reduxForm({
  form: 'signup',
  validate
})(Signup)

export default Signup = connect(mapStateToProps, {signUpUserEmail})(Signup);