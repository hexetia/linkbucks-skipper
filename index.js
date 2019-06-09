const puppeteer = require('puppeteer');

/**
 *
 * @param {string} link
 * @param {function} callback return the skiped link
 * @returns {Promise<void>}
 */
const skipLink = async (link, callback) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    async function logRequest(interceptedRequest) {
        const url = interceptedRequest.url();
        if (url.indexOf('intermission/loadTargetUrl?t') !== -1) {
            interceptedRequest.continue();
            while (interceptedRequest.response() == null) {
                // sleep 2 seconds
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
            const response = await interceptedRequest.response().json();
            callback(response.Url);
            await page.evaluate(() => {
                document.body.innerHTML = "<div id='pulado'></div>"
            });
        } else {
            interceptedRequest.continue();
        }
    }

    await page.setRequestInterception(true);
    page.on('request', logRequest);

    await page.goto(link);
    try {
        await page.waitForSelector("#pulado");
    } catch (e) {
        callback(null);
    }

    await browser.close();
};

module.exports.default = skipLink;
