defmodule NewtasktrackerWeb.TaskView do
  use NewtasktrackerWeb, :view
  alias NewtasktrackerWeb.TaskView
  alias NewtasktrackerWeb.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "alltask.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end
 
   def render("alltask.json", %{task: task}) do
    IO.puts(inspect(task))
    %{id: task.id,
      title: task.title,
      description: task.description,
      completion_status: task.completion_status,
      time: task.time,
      user: render_one(task.user,UserView, "user.json"),
      user_id: task.user.id
        }
  end

  def render("task.json", %{task: task}) do
    IO.puts(inspect(task))
    %{id: task.id,
      title: task.title,
      description: task.description,
      completion_status: task.completion_status,
      time: task.time,
      user_id: task.user_id
	}
  end
end
