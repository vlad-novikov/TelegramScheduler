const SHEET_NAME = "Копилка челлендж";
const TABLE_RANGE = "A2:E27";
const SHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
const PAYMENT_MESSAGES = {
  0: "Напоминалка: сегодня тебе надо внести %amount₽ в копилку для челленджа",
  1: "Напоминалка: завтра тебе надо внести %amount₽ в копилку для челленджа",
}

class Payment {
  constructor(date, week, amount, paid) {
    this.date = date;
    this.week = week;
    this.amount = amount;
    this.paid = paid;
  }

  daysBeforePayment() {
    let today = new Date();
    return Math.ceil((this.date - today) / 86400000);
  }

  isPaid() {
    return this.paid;
  }

  getAmount() {
    return this.amount;
  }
}

function getCurrentPayment() {
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

