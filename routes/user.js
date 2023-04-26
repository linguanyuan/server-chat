/*
 * @Description: 这是***页面（组件）
 * @Date: 2023-04-25 11:34:46
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-04-26 19:52:46
 */
import express from "express"
import { query } from "../utils/common.js"
import userModel from "../model/users.js"
import expressJWT from "express-jwt";
import jwt from "jsonwebtoken";

const router = express.Router(); //调用函数
const SECRET_KEY = 'omg69978'

router.post("/login", (req, res) => {
    userModel.find({ name: req.body.email, password: req.body.password }).then((err, docs) => {
        if (docs) {
            // 校验密码....(此处省略), 如果校验成功, 生成jwt
            // 参数1: 生成到token中的信息
            // 参数2: 密钥
            // 参数3: token的有效时间: 60, "2 days", "10h", "7d"
            const token = jwt.sign(
                { user: { name: req.body.email, password: req.body.password } },
                SECRET_KEY,
                { expiresIn: '3h' }
            )
            console.log('🚀 → token', token)
            res.setHeader('Set-Cookie', token); // ⑤
            res.send({
                data: {
                    status: 200,
                    message: '登录成功!',
                    token: token,
                }
            })
        } else {
            res.send({
                data: {
                    status: 400,
                    message: '账号不存在!',
                }
            })
        }
    })
})

router.post("/register", (req, res) => {
    userModel.find({ name: req.body.name, email: req.body.email }).then(doc => {
        if (doc) {
            return res.status(400).json("名字/邮箱已被注册!");
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: "200",
                r: "pg",
                d: "mm",
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                //相同名字写一个
                avatar,
                password: req.body.password,
                identity: req.body.identity,
            });
            //saltRounds：加密的模式--10
            // bcrypt.genSalt(saltRounds, function (err, salt) {
            //   bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            //     // Store hash in your password DB.
            //   });
            // });
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, function (err, hash) {
                    // Store hash in your password DB.
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save() //存储方法
                        .then((user) => res.json(user)) //如果返回成功
                        .catch((err) => console.log(err));
                });
            });
            res.send("注册成功");
        }
    })
});

//导出该路由
export default router;