import React from 'react';
import { NavLink } from 'react-router-dom';
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
        Test
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
        Test
      </span>
    </nav>
  );
}

function state2props(state){
	return {
		token: state.token
	};
}

export default connect(state2props)(Nav);
