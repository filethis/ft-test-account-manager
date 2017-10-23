require 'net/http'
require 'net/https'

# Delete account (DELETE )
def send_request
  uri = URI('{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}')

  # Create client
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  # Create Request
  req =  Net::HTTP::Delete.new(uri)
  # Add headers
  req.add_field "Authorization", "Basic {{BASIC}}"

  # Fetch Request
  res = http.request(req)
  puts "Response HTTP Status Code: #{res.code}"
  puts "Response HTTP Response Body: #{res.body}"
rescue StandardError => e
  puts "HTTP Request failed (#{e.message})"
end


