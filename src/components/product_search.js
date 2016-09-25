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
      return (
        <option key={category[1]} value={category[1]}>{category[0]}</option>
      )
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
              <input
                onChange={this.handleChange.bind(this, 'productName')}
                name="productName"
                type="text"
                className="form-control form-control-lg"
                placeholder="Product name"
              />
          </div>
          <div className="form-group">
              <select className="form-control form-control-lg">
                <option>Product category</option>
                {this.props.categories.map(this.renderCategories)}
              </select>
          </div>
          <button type="submit" className="btn btn-primary btn-lg"><i className="fa fa-fw fa-search"></i> Find</button>
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