import agoraToken from 'agora-token'
import Channel from '../models/RtcChannel.js'

const { RtcTokenBuilder, RtcRole } = agoraToken
import { appId,appCertificate,expirationInSeconds } from '../constants.js';

export const getRtcTokenForChannel = async (req, res) => {
    try {
      const { channelName, agoraUid } = req.params;
      const { userAccount } = req.query;
      // Generate RTC token
      const token = RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCertificate,
        channelName,
        agoraUid,
        RtcRole.PUBLISHER,
        expirationInSeconds
      );
      const existingChannel = await Channel.findOne({ channelName });
      if (existingChannel) {
        existingChannel.members.set(userAccount, agoraUid);
        await existingChannel.save();
      } else {
        const members = { [userAccount]: agoraUid}
        const newChannel = new Channel({
          channelName,
          members,
        });
        await newChannel.save();
      }
      res.status(200).json({
        code: "RES_OK",
        accessToken: token,
        expireTime: expirationInSeconds,
        agoraUid: agoraUid
      })
    } catch (error) {
      console.error('Error generating RTC token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const getUserMapperForChannel = async (req, res) => {
    try {
      const { channelName } = req.query;
      if (!channelName) {
        return res.status(400).json({ error: 'channelName query parameter is required' });
      }
      const channel = await Channel.findOne({ channelName });
      if (channel) {
        res.status(200).json({
          code: "RES_OK",
          channelName: channelName,
          "result": channel.members
        })
      } else {
        res.status(404).json({ error: 'Channel not found' });
      }
    } catch (error) {
      console.error('Error retrieving data from MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };