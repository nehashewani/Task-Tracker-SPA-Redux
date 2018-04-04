import React from 'react';
import store from './store';
import utils from './util';
import { Redirect } from 'react-router-dom';


class Server{
	add_user(data){
		$.ajax("/api/v1/users",{
			method:"post",
			dataType:"json",
			contentType:"application/json; charset=UTF-8",
			data: JSON.stringify({user:data}),
			success: (resp) =>{
				console.log("From api add_user", resp, utils.is_empty(resp.errors));
				if(utils.is_empty(resp.errors)){
					store.dispatch({
				  	type:'CLEAR_NEW_USER'
					});
					alert('User added successfully');
					//window.location = "/";
					this.request_tasks();
					this.get_users();		
					utils.redirect("/");
				}
			},
		});
	}

	request_tasks() {
   		 $.ajax("/api/v1/tasks", {
      			method: "get",
      			dataType: "json",
      			contentType: "application/json; charset=UTF-8",
      			success: (resp) => {
        			store.dispatch({
          			type: 'TASKS_LIST',
          			posts: resp.data,
        			});
      			},
    		});
  	}
	get_users(){
		$.ajax("api/v1/users",{
			method:"get",
			dataType:"json",
			contentType:"application/json; charset=UTF-8",
			success: (resp) =>{
				store.dispatch({
					type:'FETCH_USER',
					users: resp.data
				});
			}
		});
	}
	get_task(id){
		 $.ajax("/api/v1/tasks/"+id, {
                        method: "get",
                        dataType: "json",
                        contentType: "application/json; charset=UTF-8",
                        success: (resp) => {
				resp.data.is_new=false;
				resp.data.hour = parseInt(resp.data.time/60);
				resp.data.minute = resp.data.time%60;
                                store.dispatch({
                                type: 'EDIT_TASK',
                                task: resp.data,
                                });
				utils.redirect("/edittask")
                        },
                });
	}
	
	add_task(data){
	//	data.time = parseInt(data.hour)*60 + parseInt(data.minute);
		$.ajax("/api/v1/tasks",{
                        method:"post",
                        dataType:"json",
                        contentType:"application/json; charset=UTF-8",
                        data: JSON.stringify({task:data}),
                        success: (resp) =>{
                                console.log("From api add_task", resp, utils.is_empty(resp.errors));
                                if(utils.is_empty(resp.errors)){
                                        store.dispatch({
                                        type:'CLEAR_TASK'
                                        });
					store.dispatch({type:'ADD_TASK', task: resp});
                                        alert('Task added successfully');
                                        utils.redirect("/");
                                }
                        },
                });
	}
	user_login(login){
		$.ajax("/api/v1/token",{
                        method:"post",
                        dataType:"json",
                        contentType:"application/json; charset=UTF-8",
                        data: JSON.stringify(login),
                        success: (resp) =>{
                                if(utils.is_empty(resp.error)){
                                        store.dispatch({
                                        type:'SET_TOKEN',
					token: resp.token
                                        });
					store.dispatch({
						type: 'LOGIN',
						user: resp.user
					});
					utils.redirect("/");
                                }
				else{
					alert(resp.error);
				}
				store.dispatch({type:'CLEAR_LOGIN'});
                        },
                });

	}
	get_tasks(user_id){
		console.log("Code to get tasks");
	}
	update_task(data){
        //      data.time = parseInt(data.hour)*60 + parseInt(data.minute);
                $.ajax("/api/v1/tasks",{
                        method:"put",
                        dataType:"json",
                        contentType:"application/json; charset=UTF-8",
                        data: JSON.stringify({id:data.id,task:data}),
                        success: (resp) =>{
                                console.log("From api add_task", resp, utils.is_empty(resp.errors));
                                if(utils.is_empty(resp.errors)){
                                        store.dispatch({
                                        type:'CLEAR_TASK'
                                        });
					this.request_tasks();
                                        alert('Task updated successfully');
                                        utils.redirect("/viewtasks");
                                }
                        },
                });
        }
	delete_task(id){
		$.ajax("/api/v1/tasks/"+id, {
                        method: "delete",
                        dataType: "json",
                        contentType: "application/json; charset=UTF-8",
                        success: (resp) => {
				alert("Task Deleted successfully");
				this.request_tasks();
                        },
                });
	}
}

export default new Server();
