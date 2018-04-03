defmodule NewtasktrackerWeb.TaskView do
  use NewtasktrackerWeb, :view
  alias NewtasktrackerWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      description: task.description,
      completion_status: task.completion_status,
      time: task.time}
  end
end
