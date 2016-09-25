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
    console.log(this.state);
  }

  renderCategories(category) {
    return (
      <option key={category[1]} value={category[1]}>{category[0]}</option>
    )
  }

  handleChange(key, e) {
    let newState = {};
    newState[key] = e.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div className="row">
        <form className="form-inline" onSubmit={this.searchProductHandler.bind(this)}>
          <div className="form-group col-md-5">
            <input
              onChange={this.handleChange.bind(this, 'productName')}
              name="productName"
              type="text"
              className="form-control form-control-lg"
              placeholder="Product name"
            />
          </div>
          <div className="form-group col-md-4">
            <select
              className="form-control form-control-lg"
              id="productCategory"
              onChange={this.handleChange.bind(this, 'productCategory')}
            >
              <option disabled>Product category</option>
              {this.props.categories.map(this.renderCategories)}
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary btn-lg"><i className="fa fa-search"></i> Find</button>
          </div>
        </form>
        <div className="productList">

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

export default ProductSearch = connect(mapStateToProps, {getProduct})(ProductSearch);