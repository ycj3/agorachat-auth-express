# AgoraChat Auth express WebServer
A Simple Auth Server with the [Register](#register) and [login](#login) endpoint for AgoraChat App Demo([web](https://github.com/AgoraIO-Usecase/AgoraChat-web), [iOS](https://github.com/AgoraIO-Usecase/AgoraChat-ios), [android](https://github.com/AgoraIO-Usecase/AgoraChat-android)) using.
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
* register endpoint 
```
http://localhost:3000/app/chat/user/register
```
* login endpoint 
```
http://localhost:3000/app/chat/user/login
```
  
### Register
```curl
curl http://localhost:3000/app/chat/user/register \
        -H 'Content-Type: application/json' \
        -d '{ "userAccount": "demo_user_1", "userPassword": "1"}'
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
curl http://localhost:3000/app/chat/user/login \
  -H 'Content-Type: application/json' \
  -d '{ "userAccount": "demo_user_1", "userPassword": "1"}'
```
Response Example
```json
{
  "code": "RES_OK",
  "expireTimestamp": 86400,
  "chatUserName": "demo_user_1",
  "accessToken": "007eJxTYFxxxxxx5ycF",
  "agoraUid": "10764"
}

```
## Using in App Demo
### Web
<img width="1034" alt="image" src="https://github.com/CarlsonYuan/agorachat-auth-express/assets/123744402/0673e722-a97b-4159-872e-d8a31b52dd98">

### iOS
<img width="1349" alt="image" src="https://github.com/CarlsonYuan/agorachat-auth-express/assets/123744402/aed84925-29a0-4c71-b230-b6039eea0cef">

### Android
<img width="1127" alt="image" src="https://github.com/CarlsonYuan/agorachat-auth-express/assets/123744402/38705bd1-d147-4e3f-af9b-09b6390b984c">



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
