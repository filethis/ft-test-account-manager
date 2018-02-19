import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

import java.io.IOException;

import static com.jayway.jsonpath.matchers.JsonPathMatchers.hasJsonPath;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

public class TestClass
{
    @Test
    public void testHttpCall() throws IOException
    {
        // Build request
        HttpDelete request = new HttpDelete("{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens/{{TOKEN_ID}}");
        request.add("Authorization", "Basic {{API_CREDENTIALS}}");

        // Send request
        HttpResponse response = HttpClientBuilder.create().build().execute(request);

        // Extract response
        HttpEntity entity = response.getEntity();
        String jsonString = EntityUtils.toString(entity);

        assertThat(jsonString, hasJsonPath("$.status", is("OK")));
    }
}