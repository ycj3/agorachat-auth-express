# AgoraChat Auth express WebServer
Written in Node.js, using `express` framework to create a RESTful webservice for generating user tokens
> This project use `mongodb-memory-server` package which holds the data in memory for demonstrating data storage. However, you should use your own database of your backend server for storing data.<br>

## Usage
### Fill in with your information
Open *constants.js* and replace `<YOUR APP ID>` and `<YOUR APP CERTIFICATE>` with your value.  
And also replace `<YOUR RestApiHost>`, `<YOUR OrgName>` and `<YOUR AppName>`.  

```
// Get the appId and appCertificate from the agora console
const appId = "<YOUR APP ID>";

const appCertificate = "<YOUR APP CERTIFICATE>";
// Token expire time, hardcode to 86400 seconds = 1 day

const expirationInSeconds = 86400;

// Get the RestApiHost, OrgName and AppName from the chat feature in agora console
const chatRegisterURL = "https://<YOUR RestApiHost>/<YOUR OrgName>/<YOUR AppName>/users"
```

### Install Dependencies and Run

Install Dependencies
```shell
npm install
```
run the app
```shell
npm run start
```

## Test with CURL

### Register
```curl
curl -H 'Content-Type: application/json' -d '{ "account": "demo_user_1", "password": "1"}' http://localhost:3000/app/chat/user/register
```
Response Example
```json
{
  "success": true,
  "message": "User Registered Sucessfully !",
  "code": "RES_OK"
}
```

### Login
```curl
curl -H 'Content-Type: application/json' -d '{ "account": "demo_user_1", "password": "1"}' http://localhost:3000/app/chat/user/login
```
Response Example
```json
{
  "code": "RES_OK",
  "expireTimestamp": 86400,
  "chatUsername": "demo_user_1",
  "accessToken": "007eJxTYFga4RbIW1AnWP9vkWKKXk/2zfL095q757GqTvidonArdKUCQ0qycUqyeWqigVmKhYmFabJlspFZqnlSYoqBiYV5krEJa39BakMgI8PrqHUMjAysQMzIAOKrMCSaJgM1phnoWpqYWOoaGqam6loYpBjrJpqnGCQmGaaYmqcZAQAd5ycF",
  "agoraUid": 10764
}

```

## Core Code
> **Warning**  
> Need to use npm package `agora-token`. `agora-access-token` is now deprecated. refer to AgoraIO Tools [issues](https://github.com/AgoraIO/Tools/issues/324).
```
import agoraToken from 'agora-token'
const appToken = ChatTokenBuilder.buildAppToken(appId, appCertificate, expirationInSeconds);
```
> **Warning**  
> Need to use `user's uuid` (generated from Chat Rest Register User [API](https://docs.agora.io/en/agora-chat/restful-api/user-system-registration?platform=android#registering-a-user)) not `user's id`. refer to Agora [doc](https://docs.agora.io/en/agora-chat/develop/authentication?platform=android)
```
const userToken = ChatTokenBuilder.buildUserToken(appId, appCertificate, <user's uuid>, expirationInSeconds);
```

## Feedback
If something doesn't work, please [file an issue](https://github.com/CarlsonYuan/agorachat-auth-express/issues/new).<br>
