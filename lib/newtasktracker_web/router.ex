defmodule NewtasktrackerWeb.Router do
  use NewtasktrackerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", NewtasktrackerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
   scope "/api/v1", NewtasktrackerWeb do
     pipe_through :api
     resources "/users", UserController, except: [:edit]
     resources "/tasks", TaskController, except: [:new, :edit] 
     post "/token", TokenController, :create
     get "/tasks/user/:user", TaskController, :get_user_tasks
  end
end
