json.extract! photo, :id, :class, :href, :style, :created_at, :updated_at
json.url photo_url(photo, format: :json)
