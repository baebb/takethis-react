import React from 'react';
import {connect} from 'react-redux';

import RecommendItem from '../components/recommend_item'

class Home extends React.Component {
  renderRecommend(props){
    return (
      <RecommendItem
        key={props.id}
        imgMedium={props.product.imgMedium}
        title={props.product.title}
        recommender={props.recommender || null}
        brand={props.product.brand}
        reason={props.reason}
        destination={props.destination}
      />
    )
  }

  render() {
    // console.log(this.props);
    const {recommends} = this.props;
    return (
      <div className="home">
        <div className="row">
          <div className="col-md-8 offset-md-2 recommend-list">
            {recommends.hasReceivedData && recommends.data.map(this.renderRecommend)}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recommends: state.recommends
  }
}

export default Home = connect(mapStateToProps, null)(Home);