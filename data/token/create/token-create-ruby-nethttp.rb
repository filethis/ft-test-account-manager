require 'net/http'
require 'net/https'

# Create token (POST )
def send_request
  uri = URI('{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens')

  # Create client
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  body = "{
  \"expiresIn\": {{EXPIRES_IN}}
}
"

  # Create Request
  req =  Net::HTTP::Post.new(uri)
  # Add headers
  req.add_field "Authorization", "Basic {{BASIC}}"
  # Add headers
  req.add_field "Content-Type", "text/plain; charset=utf-8"
  # Set body
  req.body = body

  # Fetch Request
  res = http.request(req)
  puts "Response HTTP Status Code: #{res.code}"
  puts "Response HTTP Response Body: #{res.body}"
rescue StandardError => e
  puts "HTTP Request failed (#{e.message})"
end


