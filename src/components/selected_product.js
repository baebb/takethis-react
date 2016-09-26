import React from 'react';

export default (props) => {
  return (
    <div className="selectedProduct list-group-item">
      <div className="row">
        <div className="col-xs-2">
          <img className="img-fluid m-x-auto d-block" src={props.imgMedium}/>
        </div>
        <div className="col-xs-10">
          <h4 className="list-group-item-heading">{props.title}</h4>
          <p className="list-group-item-text">{props.brand}</p>
        </div>
      </div>
    </div>
  )
}