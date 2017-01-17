import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchIP } from '../actions/index';

class Header extends Component {
  
  componentWillMount() {
    this.props.fetchIP();
  }
  
  renderLinks() {
    if (this.props.authenticated) {
      // show a link to sign out
      return [<li className="nav-item"  key={1}>
               <Link className="nav-link" to={"/polls_id/"+this.props.user}><span className="glyphicon  glyphicon-tags"></span> Poll by ID</Link>
             </li>,
             <li className="nav-item"  key={2}>
               <Link className="nav-link" to="/newpoll"><span className="glyphicon glyphicon-th"></span> New Poll</Link>
             </li>,
             <li className="nav-item"  key={3}>
               <Link className="nav-link" to="/signout"><span className="glyphicon glyphicon-log-out"></span> Sign Out</Link>
             </li>]
    } else {
      // show a link to sign in or sign up
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin"><span className="glyphicon glyphicon-log-in"></span> Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</Link>
        </li>
      ];
    }
  }
 
  render() {
    return (
      <nav className="navbar navbar-default">
        <Link to="/" className="navbar-brand">Poll Voting</Link>
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item">
               <Link className="nav-link" to="/polls"><span className="glyphicon glyphicon-home"></span> Home</Link>
          </li>
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, {fetchIP})(Header);