/**
 * Created by admin on 2017/5/16.
 */
const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');


app.set('view engine', 'ejs');
app.use(express.static("./public")); //??????
app.get('/video', function (req, res) {
    const list = [];
    var flag = false;
    var p = new Promise(function (resolve,reject) {
        fs.readdir(__dirname+'/public/mp4',function (err,files) {
            if(err){
                console.log(err);
                reject(err);
                return;
            }
            files.forEach(function (file,index) {
                list.push(file);
            })
            resolve(list);
        });
    });

    p.then(function (list) {
        console.log(list);
        res.render('video.ejs',{list:list});
    },function (err) {
        console.log(err);
    });


});

const server = app.listen(80,'192.168.191.1');
