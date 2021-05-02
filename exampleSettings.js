const SECOND = 1000
const MINUTE = SECOND*60
const HOUR = MINUTE*60

module.exports = {
    WAIT_DELAY: SECOND*5,
    NOTIFY_DELAY: HOUR,
    LOOP_DELAY: MINUTE*2,
    
    TARGETS: [
        {
            LABEL: 'FINIX Price',
            URL: 'https://bsc.definix.com/dashboard',
            SELECTOR: '#root > div.sc-nFpLZ.gxtNRt > nav > div:nth-child(2) > div > p > strong',
            PARSER: (val) => parseFloat(val.replace('$','').replace(',','')),
            TRIGGER: (val) => val >= 3.7,
            FORMATTER: (label, val) => (label + ' $' + val)
        },

        {
            LABEL: 'World Clock London',
            URL: 'https://www.timeanddate.com/worldclock/',
            SELECTOR: 'body > div.main-content-div > section.bg--grey.pdflexi-t--small > div > div:nth-child(2) > div.my-city__clocks > div > div:nth-child(3) > span > span',
            PARSER: (val) => val,
            TRIGGER: (val) => true,
            FORMATTER: (label, val) => label + ' ' + val
        }
    ]
}