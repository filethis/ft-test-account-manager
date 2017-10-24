require 'net/http'
require 'net/https'

def send_request
  uri = URI('{{SERVER}}/api/v1/accounts')

  # Create client
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  body = "{ \"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\" }"

  # Create Request
  request = Net::HTTP::Post.new(uri)

  # Add headers
  request.add_field "Authorization", "Basic {{BASIC}}"

  # Add headers
  request.add_field "Content-Type", "text/plain; charset=utf-8"

  # Set body
  request.body = body

  # Fetch Request
  response = http.request(request)
  puts "Response HTTP Status Code: #{response.code}"
  puts "Response HTTP Response Body: #{response.body}"

rescue StandardError => e
  puts "HTTP Request failed (#{e.message})"
end