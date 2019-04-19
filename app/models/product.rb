require 'zip'

class Product < ApplicationRecord
  after_create :unzip_file
  include Rails.application.routes.url_helpers # may only be useful for the console...

  has_one_attached :zip_file
  has_many_attached :images
  has_secure_token

  def link_images(zip_path)
    Zip::File.open(zip_path) do |zip_file|
      zip_file.drop(1).sort_by {|obj| obj.name[/([^\/]+)$/].to_i}.each do |f|
        images.attach(io: StringIO.new(f.get_input_stream.read), filename: f.name.to_s[/([^\/]+)$/])
      end
    end
  end


  def unzip_file
    zip_path = 'tmp/uploads/import.zip'
    File.open(zip_path, 'wb') do |file|
      file.write(self.zip_file.download)
    end
    link_images(zip_path)
    FileUtils.rm_f(zip_path)
  end
end
