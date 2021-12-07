import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.generateHash = async function(password) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

userSchema.methods.validPassword = async function(password) {
  const hash = await this.password
  return await bcrypt.compare(password, hash)
}

export default model("User", userSchema);
