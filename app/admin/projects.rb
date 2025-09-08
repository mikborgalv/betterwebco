ActiveAdmin.register Project do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :web_developer_account_id, :plan, :name, :description, :status



  index do
    selectable_column
    id_column
    column :web_developer_account
    column :plan
    column :name
    column :status
    column :created_at
    actions
  end

  form do |f|
    f.inputs "Project Details" do
      f.input :web_developer_account, as: :select, collection: WebDeveloperAccount.all.map { |a| ["#{a.user.email} (#{a.plan&.name})", a.id] }
      f.input :plan, as: :select, collection: Plan.all.map { |p| [p.name, p.id] }
      f.input :name
      f.input :description
      f.input :status, as: :select, collection: ["in progress", "completed", "on hold"]
    end
    f.actions
  end

  show do
    attributes_table do
      row :web_developer_account
      row :plan
      row :name
      row :description
      row :status
      row :created_at
      row :updated_at
    end
  end
end

