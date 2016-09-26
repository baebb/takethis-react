import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: ''
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <button className="navbar-toggler hidden-sm-up" type="button">
          &#9776;
        </button>
        <div className="collapse navbar-toggleable-xs" id="navbar">
          <Link to="/" className="navbar-brand">Take This</Link>
          <div className="nav navbar-nav pull-xs-right">
            <Link to="/" className="nav-item nav-link">About</Link>
            <Link to="/" className="nav-item nav-link">Login</Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar = connect(null,{})(Navbar);