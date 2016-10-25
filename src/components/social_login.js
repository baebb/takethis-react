import React from 'react';

export default (props) => {
  return (
    <div className="social-login">
      <button className="btn btn-primary text-xs-left"
              onClick={props.signInUserOauth.bind(this, 'facebook')}><i className="fa fa-lg fa-fw fa-facebook"> </i> Sign in with Facebook</button>
      <button className="btn btn-info text-xs-left"
              onClick={props.signInUserOauth.bind(this, 'twitter')}><i className="fa fa-lg fa-fw fa-twitter"> </i> Sign in with Twitter</button>
    </div>
  )
}