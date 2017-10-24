require 'net/http'
require 'net/https'

def send_request
  uri = URI('{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}')

  # Create client
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  # Create Request
  request = Net::HTTP::Delete.new(uri)

  # Add headers
  request.add_field "Authorization", "Basic {{BASIC}}"

  # Fetch Request
  response = http.request(request)
  puts "Response HTTP Status Code: #{response.code}"
  puts "Response HTTP Response Body: #{response.body}"

rescue StandardError => e
  puts "HTTP Request failed (#{e.message})"
end