
using travishendricks.Models;

namespace travishendricks.Services;
/// <summary>
/// This class implements contract IProjectService as an example service. 
/// </summary>
public class ProjectService : IProjectService {
    private ProjectModel model;
    public ProjectService() {
        model = new ProjectModel();
    }
    /// <summary>
    /// Simple method to set first and last name.
    /// </summary>
    /// <param name="firstName">First Name</param>
    /// <param name="lastName">Last Name</param>
    /// <returns>An instance of a project model with a personalized message!</returns>
    public ProjectModel SetName(string firstName, string lastName) { 
        this.model.FirstName = firstName;
        this.model.LastName = lastName;
        return this.model;
    }
}   

