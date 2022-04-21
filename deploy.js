const BosClient = require('@baiducloud/sdk').BosClient;
const path = require('path');
const walk = require('fs-walk');

// 先取版本号
const package = require('./package.json');
const version = package.version;

const BOSConfig = {
    endpoint: 'http://bj.bcebos.com',
    credentials: {
        ak: '3e07b726bef449c4bb01694bd755ce1e',
        sk: '604bf12eaf7347cc8d81ea5a1d9b88f4'
    },
    bucket: 'bce-cdn',
    path: 'ai2b/'
};

function readAllImages(allImages, dir) {
    walk.walkSync(dir, (basedir, filename, stat) => {
        allImages.push({
            basedir,
            filename
        });
    });
}

function deployToCn() {
    const bosClient = new BosClient(BOSConfig);

    const allResources = [{
        basedir: path.join(__dirname, './dist'),
        filename: 'aida-sdk.js'
    }];
    readAllImages(allResources, path.join(__dirname, './dist/img'));

    allResources.forEach(resouce => {
        const {basedir, filename} = resouce;
        let objectName = `ai2b/aida/h5sdk/${version}/`;
        if (filename === 'aida-sdk.js') {
            objectName += 'aida-sdk.js';
        }
        else {
            objectName += `img/${filename}`;
        }

        const resouceDir = `${basedir}/${filename}`;

        bosClient.putObjectFromFile(BOSConfig.bucket, objectName, resouceDir)
            .then(
                () => {},
                () => {}
            );
    });
};

deployToCn();
