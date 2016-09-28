import React from 'react';
import {connect} from 'react-redux';


class Home extends React.Component {
  renderRecommend(props){
    return (
      <div key={props.product.ASIN} className="recommend list-group-item">
        <div className="row">
          <div className="col-xs-2">
            <img className="img-fluid m-x-auto d-block" src={props.product.imgMedium}/>
          </div>
          <div className="col-xs-10">
            <h4 className="list-group-item-heading">{props.product.title}</h4>
            <p className="list-group-item-text">{props.product.brand}</p>
            <p className="list-group-item-text">{props.reason}</p>
            <span className="tag tag-default pull-xs-right">{props.destination}</span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="home">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {this.props.recommends.map(this.renderRecommend)}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {recommends: state.recommends}
}

export default Home = connect(mapStateToProps, null)(Home);