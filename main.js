const puppeteer = require('puppeteer')
const line = require('./line')
const settings = require('./' + process.argv[2])
const {delay} = require('bluebird')

const {WAIT_DELAY, NOTIFY_DELAY, LOOP_DELAY} = settings
const {TARGETS} = settings

async function crawlAndNotify(browser, target/*, okSelector=null*/) {
    const labelText = target.LABEL;
    const url = target.URL
    const selector = target.SELECTOR
    const trigger = target.TRIGGER
    const parser = target.PARSER
    const formatter = target.FORMATTER
    
    console.log("Start crawling for", labelText)

    let page = null, errorStreak = 0
    
    while(true) {
        try {
            if(page != null) {
                await page.close()
                page = null
            }

            page = await browser.newPage();
            page.setUserAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36");
            await page.goto(url, {waitUntil: 'load', timeout: 0});

            /*
            if(okSelector != null) {
                await page.waitForSelector(okSelector)
                await page.click(okSelector)
            }
            */

            await page.waitForSelector(selector);
            await delay(WAIT_DELAY)
            let element = await page.$(selector)
            let value = await page.evaluate(el => el.textContent, element)
            value = parser(value)
            const message = formatter(labelText, value)
            console.log(message)
            
            if(trigger(value)){
                await line.pushMessageToMe(message)
                await delay(NOTIFY_DELAY)
            }

            errorStreak = 0
        } catch (err) {
            errorStreak += 1
            console.log(err)
            
            if(errorStreak >= 10) {
                await line.pushMessageToAllUsers(labelText + ' error and retrying')
                await delay(NOTIFY_DELAY)
                errorStreak = 0
            }
        }

        await delay(LOOP_DELAY)
    }    
}

async function main() {
    const browser = await puppeteer.launch({headless: true});

    for(const target of TARGETS) {
        crawlAndNotify(browser, target)
    }
}

main()