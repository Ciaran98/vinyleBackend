const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin:{type:Boolean,required:true,default:false},
  previousScores: [
    { vinyleName: String, scoreAttempts: Number, scoreTime: Number },
  ],
  friends: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = User = mongoose.model("user", userSchema);
