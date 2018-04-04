import React from 'react';
//import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText, NavItem } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import utils from '../util';
import api from '../api';
import TaskForm from './task_form';

function AddTaskForm(props){
	if(!props.task.is_new){
		props.dispatch({type:'CLEAR_TASK'});
	}
	return <TaskForm />
}

function state2props(state){
	return {
		task: state.task
	};
}

export default connect(state2props)(AddTaskForm);
