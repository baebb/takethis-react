import React from 'react';
import {connect} from 'react-redux';

import ProductSearch from './product_search';


class Recommend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: '',
      destination: '',
      reason: ''
    }
  }

  addRecommendHandler(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="form-group row productSearch">
            <div className="col-xs-12">
              <h3>Find product</h3>
              <ProductSearch />
            </div>
          </div>
          <form onSubmit={this.addRecommendHandler.bind(this)}>
            <div className="form-group row destination">
              <div className="col-xs-12 col-md-6">
                <h3>Where did you use it?</h3>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon" id="basic-addon1">
                    <i className="fa fa-map-marker fa-lg"></i></span>
                  <input type="text" className="form-control" placeholder="Location"
                         aria-describedby="basic-addon1"/>
                </div>
              </div>
            </div>
            <div className="form-group row reason">
              <div className="col-xs-12">
                <h3>How did it help you?</h3>
                <textarea className="form-control" rows="5"></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Recommend = connect(null, {})(Recommend);