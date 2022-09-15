const SETINGS_SHEET = "настройка";
const BOT_TOKEN_RANGE = "B1";
const CHAT_ID_RANGE = "B2";
const SHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SETINGS_SHEET);
class Settings {
  constructor(bottoken, chatid) {
    this.bottoken = bottoken;
    this.chatid = chatid;   
  }
  getBotToken() {
    return this.bottoken;
  }
  getChatId() {
    return this.chatid;
  }  
}
function getSettings() {
  let tokenValue = SHEET.getRange(BOT_TOKEN_RANGE).getValue();
  let idValue = SHEET.getRange(CHAT_ID_RANGE).getValue();
  let settings = new Settings(tokenValue, idValue);
  return settings;  
  }
  const settings = new Settings(BOT_TOKEN_RANGE,CHAT_ID_RANGE);