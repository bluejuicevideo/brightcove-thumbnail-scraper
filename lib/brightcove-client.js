const brightcove = require('brightcove');
const util = require('./util');

class BrightcoveClient {
    constructor() {
        this.token = process.env.BRIGHTCOVE_API_TOKEN;

        if (!this.token) {
            throw new Error('Missing Brightcove API token');
        }

        this.api = new brightcove.MediaApi(this.token);
    }

    fetchVideos(page = 0) {
        return new Promise((resolve, reject) => {
            const options = this.api.withOptions()
                    			.includingCountOfItems()
                                .includingVideoField().videoId()
                                .includingVideoField().title()
                                .includingVideoField().videoStillUrl()
                                .atPage(page);

            this.api.findAllVideos(options, (error, response) => {
                if (error) {
                    return util.logError(error);
                }

                const items = response.items;
                const currentPage = response.page_number;
                const pageSize = response.page_size;
                const totalItems = response.total_count;

                const totalPages = Math.floor(totalItems / pageSize);

                const hasMore = currentPage < totalPages;

                util.logInfo(`Fetched ${items.length} items, page ${currentPage} of ${totalPages}`);

                if (hasMore) {
                    this.fetchVideos(currentPage + 1)
                        .then(items => {
                            resolve([].concat(response.items, items));
                        });
                } else {
                    resolve(response.items);
                }
            });
        });
    }

}

module.exports = BrightcoveClient;
