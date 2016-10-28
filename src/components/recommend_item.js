import React from 'react';
import {Link} from 'react-router';

export default (props) => {
  return (
    <div className="recommend list-group-item">
      <div className="row">
        <div className="col-xs-2 product-img-wrapper">
          <img className="img-fluid product-img" src={props.imgMedium}/>
        </div>
        <div className="col-xs-10 product-details-wrapper">
          <p className="list-group-item-text text-muted product-details-brand"><small>{props.brand}</small></p>
          <h4 className="list-group-item-heading product-details-title">{props.title}</h4>
          <p className="list-group-item-text text-muted product-details-recommender"><small>by
            <img
              className={
                "user-img-small img-circle" +
                (!props.recommender ? " anonymous-one" : '')
              }
              width="20px" height="20px"
              src={props.recommender ? props.recommender.photoURL : null}
            />
            {props.recommender ? props.recommender.username : 'Anonymous'}</small></p>
          <p className="list-group-item-text font-italic product-details-reason">{props.reason}</p>
          <span className="tag tag-default pull-xs-right product-details-destination">{props.destination}</span>
        </div>
      </div>
    </div>
  )
}