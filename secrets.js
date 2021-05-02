require('dotenv').config({ path: __dirname + '/.env' })

const secrets = {
        line: {
                channelID: process.env.LINE_CHANNEL_ID,
                channelSecret: process.env.LINE_CHANNEL_SECRET,
                channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
        },
        myLineUserId: '',
}

secrets.myLineUserId = process.env['LINE_USER_ID']

if(module == require.main) {
        console.log(secrets)
}

module.exports = secrets