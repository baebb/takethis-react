import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {signOutUser} from '../actions/index';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      // isLogged: false,
      // hidden: true
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.authenticated ?
      this.setState({isLogged: true, hidden: false}) :
      this.setState({isLogged: false, hidden: false});
  }

  // componentDidMount() {
  //   this.setState({hidden: false});
  // }

  render() {
    // console.log(this.state);
    return (
      <nav className="navbar navbar-light bg-faded takethis-nav">
        <button className="navbar-toggler hidden-sm-up" type="button">
          &#9776;
        </button>
        <div className="collapse navbar-toggleable-xs" id="navbar">
          <Link to="/" className="navbar-brand">Take This</Link>
          {/*{!this.state.hidden &&*/}
          {/*TODO: fix login/logout flicker*/}
          <div className="nav navbar-nav pull-xs-right">
            <Link to="recommend" className="nav-item nav-link">New Recommendation</Link>
            <Link to="/signup" className="nav-item nav-link">Signup</Link>
            {this.props.authenticated ?
              <a href="" className="nav-item nav-link" onClick={this.props.signOutUser}>Logout</a>
              :
              <Link to="/login" className="nav-item nav-link">Login</Link>
            }
          </div>
          {/*}*/}
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default Navbar = connect(mapStateToProps, {signOutUser})(Navbar);