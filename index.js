/*globals ng, window, Notification */

class NativeNotification {
    constructor(message, opts) {
        let notificationObject,
            optsTmp = opts;

        if (undefined === opts) {
            optsTmp = {};
        }

        // Let's check whether notification permissions have already been granted
        if ('granted' === Notification.permission) {
            // If it's okay let's create a notification
            notificationObject = new Notification(message, optsTmp);
        } else if ('denied' !== Notification.permission) {
            // Otherwise, we need to ask the user for permission
            Notification.requestPermission(function (permission) {
                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }
                if ('granted' === permission) {
                    // If the user accepts, let's create a notification
                    notificationObject = new Notification(message, optsTmp);
                }
            });
        }
    }
}
