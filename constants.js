const hostname = '127.0.0.1'
const port = 3000

// Get the appId and appCertificate from the agora console
const appId = "<YOUR APP ID>";
const appCertificate = "<YOUR APP CERTIFICATE>";
// Token expire time, hardcode to 86400 seconds = 1 day
const expirationInSeconds = 86400;

// Get the RestApiHost, OrgName and AppName from the chat feature in agora console
const chatRegisterURL = "https://<YOUR RestApiHost>/<YOUR OrgName>/<YOUR AppName>/users"

export {
    hostname,
    port,
    appId,
    appCertificate,
    expirationInSeconds,
    chatRegisterURL
}
