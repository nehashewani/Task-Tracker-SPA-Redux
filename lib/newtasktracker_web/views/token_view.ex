defmodule NewtasktrackerWeb.TokenView do
  use NewtasktrackerWeb, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      user: %{id: user.id, name: user.name, email: user.email},
      token: token,
    }
  end
  def render("token.json", %{error: data}) do
    %{
      error: data
    }
  end

end
