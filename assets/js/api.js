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
					utils.redirect("/");
				}
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
}

export default new Server();
