/*
 * @Description: 这是***页面（组件）
 * @Date: 2023-04-25 10:24:05
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-04-26 15:19:10
 */
import mongoose from "../connect.js"

/**
 * 查询
 * @param collection 集合名称
 * @param params 查询条件
 * @param cb
 */
export const query = (collection, params, cb) => {
    mongoose(function (db) {
        db.collection(collection)
            .find(params)
            .toArray(function (err, results) {
                cb(err, results);
            });
    });
}

/**
 * 插入一条数据
 * @param collection 集合名称
 * @param obj 数据
 * @param cb 返回值
 */
export const insert = (collection, obj, cb) => {
    mongoose.conn(function (db) {
        db.collection(collection).insertOne(obj, function (err, results) {
            cb(err, results);
        })
    });

}

/**
 * 修改一条记录
 * @param collection 集合名称
 * @param whereObj 条件
 * @param upObj 更新内容
 * @param cb 返回值
 */
export const update = (collection, whereObj, upObj, cb) => {
    mongoose.conn(function (db) {
        db.collection(collection).updateOne(whereObj, upObj, function (err, results) {
            cb(err, results);
        })
    });
}

/**
 * 删除一条记录
 * @param collection 集合名称
 * @param whereObj 条件
 * @param cb 返回值
 */
export const deletes = (collection, whereObj, cb) => {
    mongoose.conn(function (db) {
        db.collection(collection).deleteOne(whereObj, function (err, results) {
            cb(err, results);
        })
    });
}