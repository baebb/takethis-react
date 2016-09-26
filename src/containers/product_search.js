import React from 'react';
import {connect} from 'react-redux';

import {getProducts,selectProduct} from '../actions/index';

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
    // console.log(this.state);
    this.props.getProducts({
      keyword: this.state.productName,
      category: this.state.productCategory
    })
  }

  selectProductHandler(id) {
    // console.log(id);
    let selectedProduct = this.props.results.find((product) => {
      return product.ASIN == id;
    })
    //console.log(selectedProduct);
    this.props.selectProduct(selectedProduct);
  }

  handleChange(key, e) {
    let newState = {};
    newState[key] = e.target.value;
    this.setState(newState);
  }

  renderCategories(category) {
    return (
      <option key={category[1]} value={category[1]}>{category[0]}</option>
    )
  }

  renderResults(result) {
    return (
      <div
        onClick={this.selectProductHandler.bind(this, result.ASIN)}
        key={result.ASIN}
        id={result.ASIN}
        className="list-group-item list-group-item-action"
      >
        <h5 className="list-group-item-heading">{result.title}</h5>
        <p className="list-group-item-text">{result.brand}</p>
      </div>
    )
  }

  render() {
    const {results} = this.props;
    // console.log(this.props);
    return (
      <div>
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
                defaultValue={'placeholder'}
                onChange={this.handleChange.bind(this, 'productCategory')}>
                <option value={'placeholder'} disabled>Category</option>
                {this.props.categories.map(this.renderCategories)}
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary btn-lg"><i className="fa fa-search"></i> Find</button>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {results.length > 1 &&
            <div className="productList list-group">
              {results.map(this.renderResults.bind(this))}
            </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    results: state.searchProducts.results,
    selected: state.searchProducts.selected
  };
}

export default ProductSearch = connect(mapStateToProps,{getProducts,selectProduct})(ProductSearch);