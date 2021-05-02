const LINEBot = require('line-messaging')
const secrets = require('./secrets')

const bot = LINEBot.Client(secrets.line)

async function pushMessageToMe(message) {
  const textMessageBuilder = new LINEBot.TextMessageBuilder(message);
  console.log('Push message to', secrets.myLineUserId)
  console.log('->', message)
  bot.pushMessage(secrets.myLineUserId, textMessageBuilder)
}

if (module === require.main) {
  pushMessageToMe('hello test')
}

module.exports = {
  pushMessageToMe
}