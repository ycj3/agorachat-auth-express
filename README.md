## Introduction
This is an simple Express app, which was integrated AgoraChat's authentication.  

There are two endpoints for  `registering` and `logining` the user into your app. Authentication workflow refer [here](https://medium.com/@carlsonyuandev/authentication-server-for-agorachat-sequence-diagrams-da4c2992d2aa)


## Usage
### Fill in with your information
Open *auth-demo.js* and replace `<YOUR APP ID>` and `<YOUR APP CERTIFICATE>` with your value.  
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

Register
```curl
curl --request POST \
  --url http://localhost:3000/register \
  --header 'Content-Type: application/json' \
  --data '{
 "account": "CarlsonYuan",
 "password": "1"
}'
```

Login
```curl
curl --request POST \
  --url http://localhost:3000/login \
  --header 'Content-Type: application/json' \
  --data '{
 "account": "CarlsonYuan",
 "password": "1"
}'
```
