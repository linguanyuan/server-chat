/*
 * @Description: 连接mongodb（组件）
 * @Date: 2023-01-06 18:01:41
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-04-24 18:44:08
 */
import mongoose from "mongoose";

//定义字符串常量
const db_url = "mongodb://localhost:27017/chat"

//1.连接数据库
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
//2.连接成功
mongoose.connection.on('connected', function () {
  console.log('连接成功：', db_url);
})
//3.连接失败
mongoose.connection.on('error', function (err) {
  console.log('连接错误：', err);
})
//4.断开连接
mongoose.connection.on('disconnection', function () {
  console.log('断开连接');
})

export default mongoose