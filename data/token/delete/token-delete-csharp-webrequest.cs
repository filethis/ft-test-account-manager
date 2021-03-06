using System;
using System.Threading.Tasks;
using System.Net;
using System.IO;
using System.Text;

namespace MyNamespace
{
    public class MyActivity
    {
        private async Task<bool> DeleteToken()
        {
            string url = "{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens/{{TOKEN_ID}}";

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(new Uri(url));
            request.Headers.Add("Authorization", "Basic {{API_CREDENTIALS}}");

            request.Method = "DELETE";

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