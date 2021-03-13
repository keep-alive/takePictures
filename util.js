/*
 * @Description: 获取并写入图片
 * @Author: zhangtianwen
 * @LastEditTime: 2021-03-13 14:05:46
 */
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
exports.downloadImg = function (dom) {
    let $ = cheerio.load(dom);
    let srcs = [...$('img')].map(ele => {
        return $(ele).attr('src')
    }).filter(url => {
        let reg = /\.(png|jpe?g|gif|svg)$/;
        return url && reg.test(url)
    })
    for(let i=0;i<2;i++) {
        let src = srcs[i];
        let ext = path.extname(src);
        axios.get(src, { responseType: 'stream' }).then(res => {
            res.data.pipe(fs.createWriteStream(path.resolve(__dirname, `./img/${i}${ext}`), { encoding: 'binary'}))
        }).catch(console.error)
    }
}