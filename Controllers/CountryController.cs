using Microsoft.AspNetCore.Mvc;
using travishendricks.Models;
using travishendricks.Services;

namespace travishendricks.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class CountryController : ControllerBase
{
    private readonly IHttpRequestService httpService;

    public CountryController(
        // ILogger<ProjectController> logger, 
        IHttpRequestService httpService)
    {
        // this.logger = logger;
        this.httpService = httpService;
    }

    [HttpGet("getcountries")]
    public JsonResult GetCountries() {
        // var countries = httpService.GetUrl<CountryModel>("https://restcountries.com/v3.1/name/per");
        return new JsonResult("Travis was here");
    }

    // private readonly ILogger<ProjectController> logger;
    // private readonly IProjectService projectService;

    // public CountryController(
    //     ILogger<ProjectController> logger, 
    //     IProjectService projectService)
    // {
    //     this.logger = logger;
    //     this.projectService = projectService;
    // }
}
