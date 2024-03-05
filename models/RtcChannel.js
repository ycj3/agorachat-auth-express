import mongoose from 'mongoose'
const ChannelSchema = new mongoose.Schema({
    channelName: String,
    members: {
        type: Map,
        of: String,
      },
  })
  
  const Channel = mongoose.model('Channel', ChannelSchema)
  export default Channel