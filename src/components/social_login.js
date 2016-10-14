import React from 'react';

export default (props) => {
  return (
    <div className="social-login">
      <button className="btn btn-primary text-xs-left"
              onClick={props.signInUserOauth.bind(this, 'facebook')}><i className="fa fa-lg fa-fw fa-facebook"> </i> <strong>Log in with Facebook</strong></button>
      <button className="btn btn-info text-xs-left"
              onClick={props.signInUserOauth.bind(this, 'twitter')}><i className="fa fa-lg fa-fw fa-twitter"> </i> <strong>Log in with Twitter</strong></button>
    </div>
  )
}