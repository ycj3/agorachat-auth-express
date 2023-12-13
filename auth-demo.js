
import express from 'express'
const app = express()
import fetch from 'node-fetch'
import cors from 'cors'
import agoraToken from 'agora-token'
import User from './models/User'
import dbConnect from './utils/dbConnect'

const { ChatTokenBuilder } = agoraToken
import { hostname,port,appId,appCertificate,expirationInSeconds,baseURLUsers } from './constants.js';


app.use(cors())
app.use(express.json())

app.post('/app/chat/user/login', async (req, res) => {
  const chatUid = req.body.account
  const user = await getUserFromCache(chatUid)
  if (user) {
    const userToken = ChatTokenBuilder.buildUserToken(appId, appCertificate, user.userUuid, expirationInSeconds);
    res
      .status(200)
      .json({
        code: "RES_OK",
        expireTimestamp: expirationInSeconds,
        chatUsername: chatUid,
        accessToken: userToken, // agorachatAuthToken
        agoraUid: Math.floor(Math.random() * 1000 + 10000) // Returns a random integer from 10000 to 11000:
      })
  } else {
    res.status(401).json({
      message: 'Your account does not exist, please register first'
    })
  }
})

async function getUserFromCache(chatUid) {
  await dbConnect()
  var user = await User.findOne({account: chatUid})
  if (user) {
    return user
  }
  // If user is not in cache, fetch it from the chat server
  const chatUuid = await fetchUserFromChatServer(chatUid);
  if (chatUuid == null) return null

  // Store user in cache for future use
  user = await User.create({
    "account": chatUid,
    "chatUsername": chatUid,
    "userUuid": chatUuid
  })

  return user;
}

// query user from chat server
async function fetchUserFromChatServer(chatUid){
  console.log(chatUid)
  const appToken = ChatTokenBuilder.buildAppToken(appId, appCertificate, expirationInSeconds);
  const response = await fetch(baseURLUsers + "/" + chatUid, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer '+appToken,
    }
  })
  if (response.status != 200 ) {
    return null
  }
  const result = await response.json()
  return result.entities[0].uuid
}

app.post('/app/chat/user/register', async (req, res) => {

  await dbConnect()
  const account = req.body.account
  const password = req.body.password
  // const chatUsername = "<User-defined username>"
  // const chatPassword = "<User-defined password>"
  // const ChatNickname = "<User-defined nickname>"
  const chatUsername = account
  const chatPassword = password
  const ChatNickname = account
  
  const body = {'username': chatUsername, 'password': chatPassword, 'nickname': ChatNickname};
  const appToken = ChatTokenBuilder.buildAppToken(appId, appCertificate, expirationInSeconds);
  const response = await fetch(baseURLUsers , {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer '+appToken,
    },
    body: JSON.stringify(body)
  })
  const result = await response.json()
  if (response.status != 200 ) {
    res.status(400).json({ success: false, data: result })
    return
  }
  try {
    await User.create({
      "account": account,
      "password": password,
      "chatUsername": chatUsername,
      "userUuid": result.entities[0].uuid
    })
    res.status(200).json({ success: true, message: "User Registered Sucessfully !", "code": "RES_OK" })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false })
  }

})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
