const SHEET_NAME = "настройка";
const TOKEN_RANGE = "B1";
const BOTID_RANGE = "B2";
const SHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
const PAYMENT_MESSAGES = {
  0: "Напоминалка: сегодня тебе надо внести %amount₽ в копилку для челленджа",
  1: "Напоминалка: завтра тебе надо внести %amount₽ в копилку для челленджа",
}

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

function getCurrentSettings() {
  let data = SHEET.getRange(TABLE_RANGE).getValues();
  for (line of data) {
    let payment = new Payment(line[0], line[1], line[2], line[4]);
    if (!payment.isPaid()) {
      return payment;
    }
  }
}

function paymentScheduler() {
  let payment = getCurrentPayment();
  let daysLeft = payment.daysBeforePayment();
  let messageToSend = PAYMENT_MESSAGES[daysLeft];
  if (messageToSend != null) {
    messageToSend = messageToSend.replace("%amount", payment.getAmount());
    tgBot.sendMessage(messageToSend);
  }
}

