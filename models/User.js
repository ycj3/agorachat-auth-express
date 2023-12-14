import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  userAccount: String,
  userPassword: String,
  chatUsername: String,
  userUuid: String
})

const User = mongoose.model('User', UserSchema)
export default User



