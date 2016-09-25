import React from 'react';
import {connect} from 'react-redux';

import {getProduct} from '../actions/index';

class ProductSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productCategory: ''
    }
  }

  searchProductHandler(e) {
    e.preventDefault();

  }

  renderCategories(category) {
    console.log('got me');
    // categories.map((category) => {
    //   console.log(category[0], category[1]);
      return (
        <option value={category[1]}>{category[0]}</option>
      )
    // })
  }

  handleChange(key, e) {
    console.log(this.state);
    let newState = {};
    newState[key] = e.target.value;
    this.setState(newState);
  }

  render(){
    console.log(this.props);
    return (
      <div>
        <form className="form-inline" onSubmit={this.searchProductHandler.bind(this)}>
          <div className="form-group">
            <div className="input-group input-group-lg">
              <span className="input-group-addon">@</span>
              <input
                onChange={this.handleChange.bind(this, 'productName')}
                name="productName"
                type="text"
                className="form-control"
                placeholder="Product name"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group input-group-lg">
              <select className="form-control form-control-lg">
                {this.props.categories.map(this.renderCategories)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Find</button>
        </form>
        <div className="productList">

        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    categories: state.categories
  };
}

export default ProductSearch = connect(mapStateToProps,{getProduct})(ProductSearch);