
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace travishendricks.Services;

public class HttpRequestService : IHttpRequestService
{
    private readonly IConfiguration configuration;
    private readonly IHttpClientFactory clientFactory;
    private readonly ILogger<HttpRequestService> logger;

    public HttpRequestService(
        IConfiguration configuration,
        IHttpClientFactory clientFactory,
        ILogger<HttpRequestService> logger)
    {
        this.configuration = configuration;
        this.clientFactory = clientFactory;
        this.logger = logger;
    }

    private async Task<HttpResponseMessage> GetUrl(string url)
    {
        var client = clientFactory.CreateClient();

        var request = new HttpRequestMessage(HttpMethod.Get, url);

        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue(MediaTypeNames.Application.Json));
        request.Headers.UserAgent.Add(new ProductInfoHeaderValue("travishendricks","1.0"));

        request.Content = new StringContent(string.Empty, Encoding.UTF8, MediaTypeNames.Application.Json);

        var response = await client.SendAsync(request);

        if (!response.IsSuccessStatusCode)
        {
            logger.LogError(string.Format("StatusCode : {0} - {1}", response.StatusCode.ToString(), response.Content.ReadAsStringAsync()));
            throw (new HttpRequestException(response.Content.ReadAsStringAsync().Result));
        }

        return response;
    }

    public T GetUrl<T>(string url) where T : class
    {
        var response = GetUrl(url).Result;
        var result = response.Content.ReadAsStringAsync().Result;
        return JsonSerializer.Deserialize<T>(result);
    }

    public async Task<T> GetUrlAsync<T>(string url) where T : class
    {
        var response = await GetUrl(url);
        var result = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<T>(result);
    }
}
