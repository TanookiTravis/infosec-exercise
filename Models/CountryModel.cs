
namespace travishendricks.Models;
public class CountryModel {
    public string NameCommon { get; set; } = string.Empty;
    public string NameOfficial { get; set; } = string.Empty;
    public string AlphaCode2 { get; set; } = string.Empty;
    public string AlphaCode3 { get; set; } = string.Empty;
    public string FlagImageUrl { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string SubRegion { get; set; } = string.Empty;
    public string Population { get; set; } = string.Empty;
    public List<String> Languages { get; set; } = new List<String>();
}