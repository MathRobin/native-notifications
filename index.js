/*globals ng, window, Notification */

class NativeNotification {
    constructor(message, opts) {
        let notificationObject,
            optsTmp = opts;

        if (undefined === opts) {
            optsTmp = {};
        }

        if ('granted' === Notification.permission) {
            notificationObject = new Notification(message, optsTmp);
        } else if ('denied' !== Notification.permission) {
            Notification.requestPermission(function (permission) {
                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }
                if ('granted' === permission) {
                    notificationObject = new Notification(message, optsTmp);
                }
            });
        }
    }
}
