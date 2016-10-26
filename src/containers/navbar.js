import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {signOutUser,authUser} from '../actions/index';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      // isLogged: false,
      // hidden: true
    }
  }

  componentDidMount() {
    //prevents flicker of login/logout
    if(!this.props.authenticated) {
      for (var key in localStorage) {
        if (key.startsWith("firebase:authUser:")) {
          this.props.authUser();
        }
      }
    }
  }

  render() {
    // console.log(this.state);
    return (
      <nav className="navbar navbar-light bg-faded takethis-nav">
        <button className="navbar-toggler hidden-sm-up" type="button">
          &#9776;
        </button>
        <div className="collapse navbar-toggleable-xs" id="navbar">
          <Link to="/" className="navbar-brand">Take This</Link>
          <div className="nav navbar-nav pull-xs-right">
            <Link to="recommend" className="nav-item nav-link">New Recommendation</Link>
            {this.props.authenticated ?
              <a className="nav-item nav-link" onClick={this.props.signOutUser}>Logout</a>
              :
              <Link to="/login" className="nav-item nav-link">Sign Up/Login</Link>
            }
          </div>
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

export default Navbar = connect(mapStateToProps, {signOutUser, authUser})(Navbar);