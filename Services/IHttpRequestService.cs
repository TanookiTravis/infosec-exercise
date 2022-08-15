public interface IHttpRequestService {
    public T GetUrl<T>(string url) where T : class;
    public Task<T> GetUrlAsync<T>(string url) where T : class;
}