defmodule Newtasktracker.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true 

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user

    |> cast(attrs, [:name, :email, :password])
    |> validate_required([:password, :email])
    |> put_change(:password_hash, hashed_password(attrs["password"]))
  end
  
  defp hashed_password(pass) do
	IO.puts(pass)
	Comeonin.Argon2.hashpwsalt(pass)
  end
end
