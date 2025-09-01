ActiveAdmin.register User do
  # Columns shown in index (optional)
  index do
    selectable_column
    id_column
    column :email
    column :created_at
    actions
  end

  # ✅ Keep filters simple. Ransack will use “contains” for strings.
  filter :email     # or: filter :email, as: :string
  filter :created_at

  # If you previously had `filter :email_cont`, you can remove it.
  # `filter :email` is enough once email is whitelisted in the model.
end

