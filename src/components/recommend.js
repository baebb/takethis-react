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
    const {selected} = this.props;
    console.log(selected);
    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="form-group row productSearch">
            <div className="col-xs-12">
              <h3>Find product</h3>
              <ProductSearch />
              {selected &&
              <div className="selectedProduct list-group-item">
                <div className="row">
                  <div className="col-xs-2">
                    <img className="img-fluid m-x-auto d-block" src={selected.imgMedium}/>
                  </div>
                  <div className="col-xs-10">
                    <h4 className="list-group-item-heading">{selected.title}</h4>
                    <p className="list-group-item-text">{selected.brand}</p>
                  </div>
                </div>
              </div>
              }
            </div>
          </div>
          <form onSubmit={this.addRecommendHandler.bind(this)}>
            <div className="form-group row destination">
              <div className="col-xs-12 col-md-6">
                <h3>Where did you use it?</h3>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-map-marker fa-lg"></i></span>
                  <input type="text" className="form-control" placeholder="Location"/>
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

function mapStateToProps(state) {
  return {selected: state.searchProducts.selected};
}

export default Recommend = connect(mapStateToProps, {})(Recommend);