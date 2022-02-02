const BOT_TOKEN = "SECRET";
const MY_CHAT_ID = 1234567;

class TelegramBot {
  constructor(token) {
    this.token = token;
    this.api_url = `https://api.telegram.org/bot${BOT_TOKEN}/`;
  }

  sendMessage(message) {
    Logger.log(`Sending message to telegram: ${message}`);
    try {
      let isRequestSuccessful = this._apiSendMessage(message);
        if (isRequestSuccessful) {
          Logger.log("Message was sent successful!");
        } else {
          Logger.log("Message wasn't sent");
        }
    } catch (error) {
      Logger.log(`An error occurred while sending the request: ${error}`)
    }
  }

  _apiSendMessage(message) {
    let response = UrlFetchApp.fetch(`${this.api_url}sendMessage?chat_id=${MY_CHAT_ID}&text=${message}`);
    Logger.log(`Telegram response: ${response.getContentText()}`);
    return JSON.parse(response.getContentText())["ok"];
  }
}

const tgBot = new TelegramBot(BOT_TOKEN);
