class AddTokenToProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :token, :string
  end
end
