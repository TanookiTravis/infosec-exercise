using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using travishendricks.Models;
using System.ComponentModel.DataAnnotations;
using travishendricks.Services;

namespace travishendricks.Controllers;

/// <summary>
/// Project controller for reference. 
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ProjectController : Controller
{
    private readonly ILogger<ProjectController> logger;
    private readonly IProjectService projectService;

    /// <summary>
    /// Project controller constructor.
    /// </summary>
    /// <param name="logger">Logger dependency</param>
    /// <param name="projectService">Project service dependency</param>
    public ProjectController(
        ILogger<ProjectController> logger, 
        IProjectService projectService)
    {
        this.logger = logger;
        this.projectService = projectService;
    }

    /// <summary>
    /// A simple get request to be used as a project.
    /// </summary>
    /// <param name="firstName">First Name</param>
    /// <param name="lastName">Last Name</param>
    /// <returns>Returns a personalized message!</returns>
    [HttpGet("{firstName}/{lastName}")]
    public ProjectModel Get(string firstName, string lastName) {
        if (string.IsNullOrEmpty(firstName) || string.IsNullOrEmpty(lastName)) {
            throw new BadHttpRequestException("First and Last Name are required.");
        }
        var model = this.projectService.SetName(firstName,lastName);
        return model;
    }
}