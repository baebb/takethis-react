import React from 'react';
import {connect} from 'react-redux';

class ProductSearch extends React.Component {
  searchProductHandler(e) {
    e.preventDefault();
  }

  render(){
    return (
      <div>
        <form className="form-inline" onSubmit={this.searchProductHandler.bind(this)}>
          <div className="form-group">
            <div className="input-group input-group-lg">
              <span className="input-group-addon">@</span>
              <input type="text" className="form-control" placeholder="Product name" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group input-group-lg">
              <select className="form-control form-control-lg">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Find</button>
        </form>
        <div className="productList">

        </div>
      </div>
    )
  }
}

export default ProductSearch = connect(null,{})(ProductSearch);