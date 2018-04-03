defmodule NewtasktrackerWeb.PageController do
  use NewtasktrackerWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
