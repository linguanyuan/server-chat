/*
 * @Description: 这是users页面（组件）
 * @Date: 2023-04-25 11:06:32
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-04-25 14:36:17
 */
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    identity: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });

const User  = mongoose.model("users", UserSchema);
export default User 