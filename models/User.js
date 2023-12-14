import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  userAccount: String,
  userPassword: String,
  chatUserName: String,
  userUuid: String
})

const User = mongoose.model('User', UserSchema)
export default User



