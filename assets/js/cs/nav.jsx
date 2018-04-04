import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import utils from '../util';

function Nav(props) {
	if(!utils.is_empty(props.token)){
		return(
			<nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Task Tracker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Home</NavLink>
        </NavItem>
         <NavItem>
          <NavLink to="/addtask" href="#" className="nav-link">Add Task</NavLink>
        </NavItem>
	<NavItem>
          <NavLink to="/viewtasks" href="#" className="nav-link">View Tasks</NavLink>
        </NavItem>
      </ul>
	<span className="navbar-text">
                {props.user.name}
        </span>

      <span className="navbar-text">
	<a href="javascript:void(0)" className="nav-link" onClick={() => {utils.logout();utils.redirect("/"); } }>Logout</a>
      </span>
    </nav>
		);
	}
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Task Tracker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/register" href="#" className="nav-link">Register</NavLink>
        </NavItem>
      </ul>
      <span className="navbar-text">
      </span>
    </nav>
  );
}

function state2props(state){
	return {
		token: state.token,
		user: state.user
	};
}

export default connect(state2props)(Nav);
