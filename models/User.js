import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  account: String,
  password: String,
  chatUsername: String,
  userUuid: String
})

const User = mongoose.model('User', UserSchema)
export default User



