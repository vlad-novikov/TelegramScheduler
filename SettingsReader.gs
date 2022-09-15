const SETINGS_SHEET = "настройка";
const TOKEN_RANGE = "B1";
const BOTID_RANGE = "B2";
const SHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SETINGS_SHEET);
class Settings {
  constructor(token, botid) {
    this.token = token;
    this.botid = botid;   
  }
  getToken() {
    return this.token;
  }
  getBotId() {
    return this.botid;
  }  
}
function getSettings() {
  let tokenValue = SHEET.getRange(TOKEN_RANGE).getValue();
  let botidValue = SHEET.getRange(BOTID_RANGE).getValue();
  let settings = new Settings(tokenValue, botidValue);
  return settings;  
  }