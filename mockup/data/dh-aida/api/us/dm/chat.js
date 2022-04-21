/**
* @file mockup for
* @author dingyang
*/

const custom = require('./custom');
const delay = require('./delay');
const digitalhuman = require('./digitalhuman');
const form = require('./form');
const image = require('./image');
const multiImages = require('./multiImages');
const phone = require('./phone');
const phoneVscode = require('./phoneVscode');
const skill = require('./skill');
const tag = require('./tag');
const text = require('./text');
const virtual = require('./virtual');

module.exports = (path, params, mockup) => {

    const timestamp = new Date().getTime();
    // 初始化节点
    if (params.type === 'init') {
        return mockup.ok({
            nodeId: timestamp + 1,
            caption: 'Welcome Message',
            type: 'init',
            ...digitalhuman(),
            components: [
                image(),
                tag()
            ]
        });
    }

    if (params.query.indexOf('购买课程') > -1) {
        return mockup.ok({
            nodeId: timestamp + 6513,
            caption: 'Welcome Message',
            type: 'default',
            ...digitalhuman(),
            components: [
                form()
            ]
        });
    }

    if (params.query.indexOf('4-16') > -1) {
        return mockup.ok({
            nodeId: timestamp + 234232,
            caption: 'Welcome Message',
            type: 'default',
            ...digitalhuman(),
            components: [
                skill()
            ]
        });
    }

    return mockup.ok({
        nodeId: timestamp + 24538,
        caption: 'Welcome Message',
        type: 'default',
        ...digitalhuman(),
        components: [
            text()
        ]
    });
};
