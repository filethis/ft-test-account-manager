using System;
using System.Threading.Tasks;
using System.Net;
using System.IO;
using System.Text;

namespace MyNamespace
{
    public class MyActivity
    {
        private async Task<bool> CreateAccount()
        {
            string url = "{{SERVER}}/api/v1/accounts";

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(new Uri(url));
            request.ContentType = "text/plain; charset=utf-8";
            request.Headers.Add("Authorization", "Basic {{BASIC}}");

            request.Method = "POST";

            string postData = "{ \"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\" }";
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] byte1 = encoding.GetBytes(postData);
            request.ContentLength = byte1.Length;
            Stream newStream = request.GetRequestStream();
            newStream.Write(byte1, 0, byte1.Length);
            newStream.Close();

            using (WebResponse response = await request.GetResponseAsync())
            {
                using (Stream stream = response.GetResponseStream())
                {
                    return true;
                }
            }
        }
    }
}