class RenameEmailInCustomers < ActiveRecord::Migration[8.0]
      def change
    rename_column :customers, :email, :contact_email
  end
end
