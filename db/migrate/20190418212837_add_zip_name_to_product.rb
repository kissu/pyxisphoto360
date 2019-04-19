class AddZipNameToProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :zip_name, :string
  end
end
