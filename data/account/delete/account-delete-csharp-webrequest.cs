using System;
using System.Threading.Tasks;
using System.Net;
using System.IO;
using System.Text;

namespace MyNamespace
{
    public class MyActivity
    {
        private async Task<bool> DeleteAccount()
        {
            string url = "{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}";

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(new Uri(url));
            request.Headers.Add("Authorization", "Basic {{BASIC}}");

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