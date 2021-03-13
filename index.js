/*
 * @Description: 入口文件
 * @Author: zhangtianwen
 * @LastEditTime: 2021-03-13 14:06:19
 */
const axios = require('axios');
const config = require('./config');
const util = require('./util');
async function start() {
    const { data } = await axios.get(config.targetUrl);
    util.downloadImg(data);
}
start()