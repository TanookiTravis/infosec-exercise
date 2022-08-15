
using travishendricks.Models;

namespace travishendricks.Services;

/// <summary>
/// Project contract to be implemented.
/// </summary>
public interface IProjectService {
    /// <summary>
    /// Simple method to set first and last name.
    /// </summary>
    /// <param name="firstName">First Name</param>
    /// <param name="lastName">Last Name</param>
    /// <returns>An instance of a project model</returns>
    public ProjectModel SetName(string firstName, string lastName); 
}