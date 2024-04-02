# AgoraChat Auth express WebServer
A Simple Auth Server for AgoraChat App Demo([web](https://github.com/AgoraIO-Usecase/AgoraChat-web), [iOS](https://github.com/AgoraIO-Usecase/AgoraChat-ios), [android](https://github.com/AgoraIO-Usecase/AgoraChat-android)) using.
> This project use `mongodb-memory-server` package which holds the data in memory for demonstrating data storage. However, you should use your own database of your backend server for storing data.<br>

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/CarlsonYuan/agorachat-auth-express.git
cd agorachat-auth-express
npm install
```

## Configuration 

Configure the application by updating the `constants.js` file with your Agora credentials and any other required settings.

```js
// Get the appId and appCertificate from the agora console
const appId = "<YOUR APP ID>";

const appCertificate = "<YOUR APP CERTIFICATE>";
// Token expire time, hardcode to 86400 seconds = 1 day

const expirationInSeconds = 86400;

// Get the RestApiHost, OrgName and AppName from the chat feature in agora console
const chatRegisterURL = "https://<YOUR RestApiHost>/<YOUR OrgName>/<YOUR AppName>/users"
```

## Usage

Start the server:

```bash
npm run start
```

The server will run at http://localhost:3000 by default.

## API Endpoints

- POST /app/chat/user/register:  
```bash
# Register a new user
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"userAccount": "{{your_username}}", "userPassword": "{{your_password}}"}' \
  http://localhost:3000/app/chat/user/register

# Sample Response:
# {
#   "success": true,
#   "message": "User Registered Successfully!",
#   "code": "RES_OK"
# }
```

- POST /app/chat/user/login:  
```bash
# Login a user and receive an authentication token.
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"userAccount": "{{your_username}}", "userPassword": "{{your_password}}"}' \
  http://localhost:3000/app/chat/user/login

# Sample Response:
# {
#   "code": "RES_OK",
#   "expireTimestamp": 1712139512698,
#   "chatUserName": "{{your_username}}",
#   "accessToken": "{{your_access_token}}",
#   "agoraUid": "123456"
# }
```
  
- GET /token/rtc/channel/:channelName/agorauid/:agoraUid:  
```bash
# Generate an RTC token for a specific channel and user, and map user and agoraUid in local cache.
curl "http://localhost:3000/token/rtc/channel/{{your_channel}}/agorauid/{{your_agora_uid}}?userAccount={{your_username}}"

# Sample Response:
# {
#   "code": "RES_OK",
#   "accessToken": "{{your_rtc_token}}",
#   "expireTime": 3600,
#   "agoraUid": "{{your_agora_uid}}"
# }
```

- GET /agora/channel/mapper
```bash 
# Retrieve user-agoraUid mappings for a specific channel.
curl "http://localhost:3000/agora/channel/mapper?channelName={{your_channel}}&userAccount={{your_username}}"

# Sample Response:
# {
#   "code": "RES_OK",
#   "channelName": "{{your_channel}}",
#   "result": {
#     "{{your_username}}": "{{agora_uid_1}}"
#   }
# }
```

## Using in App Demo
- Web
<img width="1034" alt="image" src="https://github.com/CarlsonYuan/agorachat-auth-express/assets/123744402/0673e722-a97b-4159-872e-d8a31b52dd98">

- iOS
<img width="1349" alt="image" src="https://github.com/CarlsonYuan/agorachat-auth-express/assets/123744402/aed84925-29a0-4c71-b230-b6039eea0cef">

- Android
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
