using Microsoft.AspNetCore.Mvc;
using travishendricks.Models;

namespace travishendricks.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class CountryController : Controller
{
    private readonly IHttpRequestService httpService;

    public CountryController(
        // ILogger<ProjectController> logger, 
        IHttpRequestService httpService)
    {
        // this.logger = logger;
        this.httpService = httpService;
    }

    [HttpGet()]
    // https://localhost:7186/api/country
    public JsonResult GetFiltered(string filterTerm) {
        var countries = httpService.GetUrl<List<CountryModel>>("https://restcountries.com/v3.1/name/peru");
        return new JsonResult(countries);
    }

    [HttpGet("name/{name}")]
    // https://localhost:7186/api/country/name/peru
    public JsonResult GetByName(string name) {
        var countries = httpService.GetUrl<List<CountryModel>>("https://restcountries.com/v3.1/name/" + name);
        return new JsonResult(countries);
    }

    [HttpGet("code/{code}")]
    // https://localhost:7186/api/country/name/peru
    public JsonResult GetByCode(string code) {
        var countries = httpService.GetUrl<List<CountryModel>>("https://restcountries.com/v3.1/alpha/" + code);
        return new JsonResult(countries);
    }

    [HttpGet("filter/{term}")]
    // https://localhost:7186/api/country/filter/pe
    public JsonResult GetByTerm(string term) {
        var countries = httpService.GetUrl<List<CountryModel>>("https://restcountries.com/v3.1/all");
        var termLowerCase = term.ToLower();
        var filterdCountries = countries
            .Where(c => c.Name.Common.ToLower().Contains(termLowerCase) 
                || c.Name.Official.ToLower().Contains(termLowerCase)
                || c.AlphaCode2.ToLower().Contains(termLowerCase)
                || c.AlphaCode3.ToLower().Contains(termLowerCase))
            .OrderByDescending(p => p.Population);
        return new JsonResult(filterdCountries);
    }
}
