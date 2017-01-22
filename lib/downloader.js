const fs = require('fs');
const mime = require('mime-types');
const mkdirp = require('mkdirp');
const request = require('request');
const path = require('path');
const slug = require('slug');
const util = require('./util');

const outputPath = path.resolve(__dirname, '../', process.env.OUTPUT_PATH || 'output/');

mkdirp.sync(outputPath);
mime.extensions['image/jpeg'].unshift('jpg');

class Downloader {

    downloadAll(items = []) {
        return items.reduce((current, next, index) => {
            return current
                .catch(error => {
                    util.logError(error);
                })
                .then(result => {
                    if (result) {
                        util.logInfo(`${index}/${items.length} | Downloaded ${result.path}`)
                    }

                    return this.download(next);
                })
        }, Promise.resolve());
    }

    download(item) {
        return new Promise((resolve, reject) => {
            const uri = item.uri;
            const name = slug(item.name + ' ' + item.id, {
                lower: true
            });

            if (!uri) {
                reject(`Missing URI for ${name}`);
                return;
            }

            request.head(uri, (error, response, body) => {
                const contentType = response.headers['content-type'];
                const extension = mime.extension(contentType);

                const dest = path.resolve(outputPath, name) + '.' + extension;

                var r = request(uri)
                    .pipe(fs.createWriteStream(dest));

                r.on('close', () => {
                    const relativePath = path.relative(process.cwd(), dest);

                    resolve({
                        name: name,
                        path: relativePath
                    });
                });

                r.on('error', error => {
                    reject(error);
                });
            });
        })

    }

}

module.exports = new Downloader();
