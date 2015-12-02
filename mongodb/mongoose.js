var mongoose = require('mongoose');
var assert = require('assert');
var connection = mongoose.createConnection("mongodb://127.0.0.1:28017/zfshop", function (err) {
    if (err)  console.log(err);
});
/*******************************************************///模式的定义
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;//ObjectId
/**
 * 创建自己的模式定义
 * 创建表结构使用与数据库没有关系
 * @type {Schema}
 */
var AuthorSchema = new Schema({
    name: String
});
/****************************************************///评论的模式
var CommentSchema = new Schema({
    content: String,
    createdate: Date
});
/******************************************************///文章的模式
var ArticalSchema = new Schema({
    title: {type: String, index: true},
    content: String,
    author: {type: ObjectId, ref: 'Author'},
    stat: {//子文档
        favs: Number,
        visited: Number
    },
    comment: [CommentSchema]
});
/*****************************************************///创建与数据库的交互
var Author = connection.model('Author', AuthorSchema);
var Artical = connection.model('Artical', ArticalSchema);
var Comment = connection.model('Comment', CommentSchema);
//new Author({name: 'zfpx'}).save()
/***************************************************////预处理的方法
ArticalSchema.pre('save', function (next) {
    this.stat = {
        favs: 50,
        visited: 20
    };
    this.author = '565e8c8c7564ae90264c8393';
    next();
});
/***************************************************///限定以后保存的模式
/*new Artical({title: 'title2', content: 'content2',
 comment: [
 {content: 'content1', createdate: new Date()}
 ]
 }).save();*/
/**************************************************///查询的方式
/*Artical.find({title: 'title2'}, function (err, res) {
 console.log(res);
 });*/
/**************************************************///分页查询
/*
 var pageNum = 2;
 var pageSize = 1;
 Artical.count(function (err, total) {
 var totalpage = Math.ceil(total / pageSize);
 var skip = (pageNum - 1) * pageSize;
 Artical.find({}).skip(skip).limit(pageSize).sort({id: 1}).populate('author').exec(function (err, res) {
 if (err) {
 console.log(err);

 } else {
 console.log(total);
 console.log(res);
 }
 });
 });*/
/*****************************************************///更新的方法

Artical.update({}, {$set: {title: 'name'}}, {multi: true}, function (err, res) {
    console.log(res);
});