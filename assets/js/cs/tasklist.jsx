import React from 'react';
//import { NavLink } from 'react-router-dom';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

function TaskList(props){
	
	let taskList = props.tasks.map((t) => <tr><td>{t.title}</td><td>{t.description}</td><td>{t.hour}</td><td>{t.minute}</td><td>Edit {t.id}</td></tr>);
	return (
		<Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Hour</th>
	    <th>Minute</th>
	    <th>Edit</th>
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
export default connect(state2props)(TaskList);
