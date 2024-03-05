import express from 'express';
import { getRtcTokenForChannel, getUserMapperForChannel } from '../controllers/rctChannelController';

const router = express.Router();

router.get('/token/rtc/channel/:channelName/agorauid/:agoraUid', getRtcTokenForChannel);
router.get('/agora/channel/mapper', getUserMapperForChannel);

export default router;