import React from 'react';
//import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText, NavItem } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import utils from '../util'
import api from '../api';

function TaskForm(props){
	let users = props.users.map((uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);

	function update(ev){
		let tgt = $(ev.target);

    		let data = {};
		if(!utils.is_empty(tgt.attr('data-parent'))){
			data[tgt.attr('data-parent')]={};
			data[tgt.attr('data-parent')][tgt.attr('name')] = tgt.val();
		}
		else
    			data[tgt.attr('name')] = tgt.val();
		if (tgt.attr('name') == "hour")
			data['time'] = (parseInt(tgt.val()) != NaN) ? parseInt(tgt.val())*60 : 0;
		if(tgt.attr('name') == "minute"){
			let hourMins = parseInt(props.task.hour);
			hourMins = (hourMins == NaN) ? 0 : (hourMins * 60);
			data['time'] = hourMins + parseInt(tgt.val());
		}
    		let action = {
      			type: 'NEW_TASK',
      			task: data,
    		};
    		console.log("updating at task form", action);	
    		props.dispatch(action);		
	}	
	function submit_task(){
		if(utils.is_empty(props.task.title)){
			alert("Task title is required.");
			return;
		}
		else if(utils.is_empty(props.task.description)){
			alert("Task description is required.");
			return;
		}
		else if(utils.is_empty(props.task.user.id)){
			alert("User is required for task.");
			return;
		}
		else if(utils.is_empty(props.task.hour) || utils.is_empty(props.task.minute)){
			alert("Time in hour or minutes is required");
			return;
		}
		api.add_task(props.task);
	}
	if(props.redirect.can_redirect)
		return <Redirect to={utils.clear_redirect()} />
	return (<div className="">
			<h1>{ (props.task.is_new) ? "Add" : "Update" } Task</h1>
			<Form>
				<FormGroup>
					<Label for="title">Title</Label>
					<Input type="text" value={props.task.title} name="title" id="title" placeholder="Task Title" onChange={update}/>
				</FormGroup>
				<FormGroup>
          				<Label for="descr">Description</Label>
          				<Input type="textarea" value={props.task.description} name="description" id="descr" onChange={update}/>
        			</FormGroup>
				<FormGroup>
					<Label for="hour">Hour</Label>
					<Input type="number" value={props.task.hour} name="hour" id="hour" onChange={update}/>
				</FormGroup>
				<FormGroup>
					<Label for="minute">Minutes</Label>
					<Input type="select" name="minute" id="minute" value={props.task.minute} onChange={update}>
						<option value="">Select Minutes</option>
						<option>0</option>
						<option>15</option>
						<option>30</option>
						<option>45</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Label for="user">User</Label>
					<Input type="select" data-parent="user" name="id" id="user" value={props.task.user.id} onChange={update} >
						<option key="-1" value="">Select User</option>
						{ users }
					</Input>
				</FormGroup>
				<FormGroup check>
					<Input type="checkbox" value={props.task.completion_status} name="completion_status" onChange={update}/> {' '} Completed
				</FormGroup>
					<Button onClick={submit_task}>Submit</Button>
				</Form>
		</div>);
}

function state2props(state){
	return {
		task: state.task,
		users: state.users,
		redirect: state.redirect
	};
}

export default connect(state2props)(TaskForm);
