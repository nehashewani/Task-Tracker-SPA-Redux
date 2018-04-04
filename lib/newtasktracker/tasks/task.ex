defmodule Newtasktracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completion_status, :boolean, default: false
    field :description, :string
    field :time, :integer
    field :title, :string
    #field :user_id, :id
    belongs_to :user, Newtasktracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :completion_status, :time, :user_id])
    |> validate_required([:title, :description, :completion_status, :time, :user_id])
  end
end
