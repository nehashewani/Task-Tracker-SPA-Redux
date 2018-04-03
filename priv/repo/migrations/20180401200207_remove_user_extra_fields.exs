defmodule Newtasktracker.Repo.Migrations.RemoveUserExtraFields do
  use Ecto.Migration

  def change do
	 alter table("users") do
		remove :pw_tries
		remove :pw_last_try
	end
  end
end
