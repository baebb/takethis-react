import React from 'react';

export default ({input, label, type, meta: {touched, error}}) => {
  return (
    <div className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <div>
        <input {...input} placeholder={label} className="form-control" type={type}/>
        {touched && error && <div className="help-block text-muted">{error}</div>}
      </div>
    </div>
  )
}