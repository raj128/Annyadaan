import mongoose from "mongoose";
var Schema = mongoose.Schema;

var userSchema = new Schema({
      name: {
        type: String,
        default: "user"
      },
      email:{
        type:String,
        required:true,
      },
      password: {
        type: String,
        required: true,
      },
      user_image: {
        type: Buffer,
        default:"no photo"
      },
      photoType: {
        type: String,
      },
      description: {
        type: String,
        default: null
      },
      ngo:{
        type:Boolean,
        default:false
      },
      booking: [{ type: Schema.ObjectId, ref: "posts" }],
});

var UserModel = mongoose.model('user', userSchema);

export default UserModel;