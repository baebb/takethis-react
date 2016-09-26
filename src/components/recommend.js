import React from 'react';
import {connect} from 'react-redux';

import ProductSearch from './product_search';
import {addRecommend} from '../actions/index';


class Recommend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      destination: '',
      reason: ''
    }
  }

  handleChange(key, e) {
    let newState = {};
    newState[key] = e.target.value;
    this.setState(newState);
  }

  addRecommendHandler(e) {
    e.preventDefault();
    this.props.addRecommend({
      product: this.props.selected,
      destination: this.state.destination,
      reason: this.state.reason
    })
  }

  render() {
    const {selected} = this.props;
    // console.log(selected);
    return (
      <div className="row recommendProduct">
        <div className="col-md-10 offset-md-1">
          <div className="row productSearch block">
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
            <div className="form-group row destination block">
              <div className="col-xs-12 col-md-6">
                <h3>Where did you use it?</h3>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-map-marker fa-lg"></i></span>
                  <input type="text" onChange={this.handleChange.bind(this, 'destination')} className="form-control" placeholder="Location"/>
                </div>
              </div>
            </div>
            <div className="form-group row reason block">
              <div className="col-xs-12">
                <h3>How did it help you?</h3>
                <textarea className="form-control" onChange={this.handleChange.bind(this, 'reason')} rows="5"></textarea>
              </div>
            </div>
            <div className="row submit block">
              <div className="col-xs-12">
                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">Recommend</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selected: state.searchProducts.selected,
    recommends: state.recommends
  };
}

export default Recommend = connect(mapStateToProps, {addRecommend})(Recommend);