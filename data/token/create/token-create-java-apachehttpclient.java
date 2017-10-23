// request Create token

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

import java.io.IOException;

import static com.jayway.jsonpath.matchers.JsonPathMatchers.hasJsonPath;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

public class TestClass {

    @Test
    public void testHttpCall() throws IOException {
        // given
        HttpPost request = new HttpPost("{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens");
        request.add("Authorization", "Basic {{BASIC}}");
        request.add("Content-Type", "text/plain; charset=utf-8");


        // when
        HttpResponse response = HttpClientBuilder.create().build().execute(request);

        // then
        HttpEntity entity = response.getEntity();
        String jsonString = EntityUtils.toString(entity);

        // and if the response is
        // {
        //     "status": "OK"
        // }
        // Then we can assert it with
        assertThat(jsonString, hasJsonPath("$.status", is("OK")));
    }
}
