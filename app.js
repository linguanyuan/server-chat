/*
 * @Description: 这是入口文件（组件）
 * @Date: 2022-09-23 11:14:17
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-04-26 15:16:40
 */
import express from "express";
import session from "express-session";
import fs from "fs";
import routerModuel from "./routes/index.js";
import bodyParser from "body-parser"; // 解决 req.body 默认为空

import parseJwt from "express-jwt" // 导入校验token的模块, 解析JWT字符串, 还原成 JSON 对象 的模块
const SECRET_KEY = 'omg69978' // 与生成token的密钥要一致!

const routerFiles = fs.readdirSync("./routes"); //读取router目录下所有文件
const app = express(); //调用函数
const port = 6868; //设置端口6868

app.use(
  session({
    secret: "WickYo", // 对cookie进行签名
    name: "session", // cookie名称，默认为connect.sid
    resave: false, // 强制将会话保存回会话容器
    rolling: true, // 强制在每个response上设置会话标识符cookie
    cookie: {
      // 5分钟
      maxAge: 300000,
    },
  })
);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//实现静态资源服务 let server = app.use('/express',express.static('public')) //use的第一个参数指定虚拟目录(路径)
app.use(express.static("./pubilc")); //public就是静态资源的根目录，静态资源放于此文件夹

//路由到应用上
//循环所有文件夹，注册到app中
routerFiles.forEach(async (v) => {
  let fileName = v.slice(0, -3)

  console.log(fileName)
  if (fileName !== 'index') {
    app.use("/api", routerModuel[fileName]);
  }
});

//监听6868端口，启动服务后触发回调函数
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
