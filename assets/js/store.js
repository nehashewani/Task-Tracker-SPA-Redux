import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
  {
	user:{},
	tasks: [],
	token: null,
	login: {
		name:"",
		pass:""
	}
  }
*/

function tasks(state=[], action){
	switch(action.type){
		case 'TASKS_LIST':
    			return [...action.posts];
		case 'ADD_TASK':
			return [action.task, ...state];
		default:
			return state;
	}
}

function user(state={}, action){
	switch(action.type){
		case 'LOGIN':
			return action.user;
		case 'LOGOUT':
			return {}
		default:
			return state;
	}
}

function users(state=[], action){
	switch(action.type){
		case 'FETCH_USER':
			return action.users;
		default:
			return state;
	}
}

function token(state=null, action){
	switch(action.type){
		case 'SET_TOKEN':
			return action.token;
		case 'LOGOUT':
			return null;
		default:
			return state;
	}
}

let loginState = {
	name:"",
	pass: "",
	err:""
};

function login(state = loginState, action){
	switch(action.type){
		case 'USER_LOGIN':
			return Object.assign({}, state, action.logindata);
		case 'CLEAR_LOGIN':
			return loginState;
	default:
		return state;
	}
}

let newuserobj = {
	name:"",
	password:"",
	confpass:"",
	email:""
};

function newuser(state = newuserobj, action){
	switch(action.type){
		case 'NEW_USER_CHANGE':
			return Object.assign({}, state, action.newuser);
		case 'CLEAR_NEW_USER':
			return newuserobj;
		default:
			return state;
	}
}

let taskObj= {
	id:-1,
	title:"",
	description:"",
	completion_status:false,
	user:{
		id:undefined
	},
	user_id: "",
	hour:"",
	minute:"",
	time:0,
	is_new:true,
};
function task(state=taskObj, action){
	switch(action.type){
		case 'NEW_TASK':
			return Object.assign({}, state, action.task);
		case 'CLEAR_TASK':
			return taskObj;
		case 'EDIT_TASK':
			return Object.assign({}, state, action.task);
		default:
			return state;
	}
}

let redirObj = {
	redirect_to: null,
	can_redirect: false
};
function redirect(state=redirObj, action){
	switch(action.type){
		case 'REDIRECT':
			return Object.assign({}, state, action.redir)
		case 'CLEAR_REDIRECT':
			return redirObj;
		default:
			return state;
	}
}


function root_reducer(state0, action){
	console.log("out state",state0);
	let reducer = combineReducers({tasks, user, token, login, newuser, users, task, redirect});
	let state1 = reducer(state0, action);
	console.log("After update", state1);
	return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
