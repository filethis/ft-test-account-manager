require 'net/http'
require 'net/https'

# Create account (POST )
def send_request
  uri = URI('{{SERVER}}/api/v1/accounts')

  # Create client
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  body = "{
  \"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\"
}"

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


