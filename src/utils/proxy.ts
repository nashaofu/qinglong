/**
 * 如果存在 PROXY_SERVER 请求就走代理
 */
if (process.env.PROXY_SERVER) {
  process.env.http_proxy = process.env.PROXY_SERVER;
  process.env.https_proxy = process.env.PROXY_SERVER;
}
