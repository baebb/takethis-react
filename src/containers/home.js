import React from 'react';
import { connect } from 'react-redux';


class Home extends React.Component {
    render() {
        return (
            <div>
                <ul></ul>
                <p>Sup Ross</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {recommends: state.recommends}
}

export default Home = connect(mapStateToProps,null)(Home);