
using System.Text.Json.Serialization;

namespace travishendricks.Models;
public class CountryModel {
    [JsonPropertyName("name")]
    public CountryName Name { get; set; } = new CountryName();
    [JsonPropertyName("cca2")]
    public string AlphaCode2 { get; set; } = string.Empty;
    [JsonPropertyName("ccn3")]
    public string AlphaCode3 { get; set; } = string.Empty;
    [JsonPropertyName("flag")]
    public string FlagImage { get; set; } = string.Empty;
    [JsonPropertyName("region")]
    public string Region { get; set; } = string.Empty;
    [JsonPropertyName("subregion")]
    public string SubRegion { get; set; } = string.Empty;
    [JsonPropertyName("population")]
    public int Population { get; set; } = 0;
    [JsonPropertyName("languages")]
    public Dictionary<string, string> Languages { get; set; }
}

public class CountryName {
    [JsonPropertyName("common")]
    public string Common { get; set; } = string.Empty;
    [JsonPropertyName("official")]
    public string Official { get; set; } = string.Empty;
}
