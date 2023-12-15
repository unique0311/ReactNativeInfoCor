export default class NotificationService {
  constructor(onNotification) {
    this.configure(onNotification);
    this.lastId = 0;
  }

  configure(onNotification) {}

  localNotification(title, message) {
    this.lastId++;
  }

  scheduleNotification(title, message, date = null) {
    let scheduleDate = date ? date : (date = new Date(Date.now() + 30 * 1000)); //30 seconds

    this.lastId++;
  }

  checkPermission(cbk) {}

  cancelNotif() {}

  cancelAll() {}
}
