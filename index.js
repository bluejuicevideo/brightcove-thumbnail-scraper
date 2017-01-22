require('dotenv').config();
const BrightcoveClient = require('./lib/brightcove-client');
const downloader = require('./lib/downloader');
const util = require('./lib/util');

const client = new BrightcoveClient();

client.fetchVideos().then(items => {
    util.logSuccess(`Fetched ${items.length} items`);

    downloader.downloadAll(items.map(item => {
        return {
            id: item.id,
            name: item.name,
            uri: item.videoStillURL
        };
    })).then(result => {
        util.logSuccess('All images downloaded');
    });
});
