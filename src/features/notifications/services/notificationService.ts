export type NotificationPermissionState = 'default' | 'granted' | 'denied' | 'unsupported';

interface NotificationPayload {
  title: string;
  body: string;
  tag?: string;
  icon?: string;
}

export const notificationService = {
  isSupported(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator;
  },

  getPermission(): NotificationPermissionState {
    if (!this.isSupported()) return 'unsupported';
    return Notification.permission as NotificationPermissionState;
  },

  async requestPermission(): Promise<NotificationPermissionState> {
    if (!this.isSupported()) return 'unsupported';
    const result = await Notification.requestPermission();
    return result as NotificationPermissionState;
  },

  async show(payload: NotificationPayload): Promise<boolean> {
    if (this.getPermission() !== 'granted') return false;

    const registration = await navigator.serviceWorker.ready;

    if (registration.active) {
      registration.active.postMessage({
        type: 'SHOW_NOTIFICATION',
        payload,
      });
      return true;
    }

    // Fallback: direct notification
    new Notification(payload.title, {
      body: payload.body,
      icon: payload.icon ?? '/icons/icon-192.png',
      tag: payload.tag,
    });
    return true;
  },
};