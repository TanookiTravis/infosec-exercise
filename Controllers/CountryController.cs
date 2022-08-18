using Microsoft.AspNetCore.Mvc;
using travishendricks.Models;

namespace travishendricks.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class TestController : Controller
{
    private readonly IHttpRequestService httpService;

    public TestController(
        // ILogger<ProjectController> logger, 
        IHttpRequestService httpService)
    {
        // this.logger = logger;
        this.httpService = httpService;
    }

    [HttpGet]
    // https://localhost:7186/api/test
    public JsonResult Test() {
        var countries = httpService.GetUrl<List<CountryModel>>("https://restcountries.com/v3.1/name/peru");
        return new JsonResult(countries);
    }

    [HttpGet("Testing")]
    public CountryModel Testing()
    {
        var countryModel = new CountryModel();
        return countryModel;
    }
}
