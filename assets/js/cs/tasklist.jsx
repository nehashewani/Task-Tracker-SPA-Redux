import React from 'react';
import { Redirect } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';
import utils from '../util';

function TaskList(props){

	function edit(id){
		api.get_task(id);
	}	
	let taskList = props.tasks.map((t) => <tr><td>{t.title}</td><td>{t.description}</td><td>{parseInt(t.time/60)}</td><td>{t.time%60}</td><td>{(t.completion_status) ? "Yes" : "No"}</td><td><Button onClick={() => {api.get_task(t.id);} }>Edit</Button></td><td><Button onClick={() => {api.delete_task(t.id);} }>Delete</Button></td></tr>);
	console.log("From tasklist:", props.redirect,utils.clear_redirect());
	if(props.redirect.can_redirect){
		utils.clear_redirect();
		return <Redirect to={props.redirect.redirect_to} />
	}
	return (
		<Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Hour</th>
	    <th>Minute</th>
	    <th>Completed?</th>
	    <th>Edit</th>
	    <th>Delete</th>
          </tr>
        </thead>
	<tbody>
		{taskList}
	</tbody>
	</Table>
	);
}
function state2props(state){
	return {
		tasks: state.tasks
	};
}
export default TaskList;
