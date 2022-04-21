/**
 * @file mock服务入口
 * @author chenbo09
 * @modify zhangzhe(zhangzhe@baidu.com)
 *
 */
const path = require('path');
const jsonServer = require('json-server');
const {get} = require('lodash');

const db = require('./db.js');
const mockup = require('./mock');
// const customRoutes = require('./custom.routes.js');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(db());

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// server.use(jsonServer.rewriter(customRoutes));

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
    // 因为本地mock不想改数据 先把所有的POST请求转为GET
    if (req.method === 'POST' || req.method === 'PUT') {
        req.method = 'GET';
    }
    // Continue to JSON Server router
    next();
});

const MOCK_DIR = path.resolve(__dirname + '/data');
router.render = (req, res) => {
    // conosle中的请求有类似 /api/dspbiz/dashboard/top?_=1557467186175 ？开始的结尾，需要移除，否则会找不到文件
    const originalUrl = req.originalUrl.replace(/\?_=\d+/, '');
    const resultData = require(MOCK_DIR + originalUrl + '.js')(originalUrl, req.body, mockup);
    setTimeout(() => res.status(200).jsonp(resultData), 500);
};

// Use default router
const port = '3001';
server.use(router);
server.listen(port, () => {
    console.log(`The JSON Server is listening on port ${port}!`);
});
