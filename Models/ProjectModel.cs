using System.ComponentModel.DataAnnotations;

// namespace BenjaminFriske.Portal.Models;
namespace travishendricks.Models;
public class ProjectModel {
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Message { get { return $"Hi {this.FirstName} {this.LastName}! You found my project service."; } }
}