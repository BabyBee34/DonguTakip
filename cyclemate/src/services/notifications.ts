import * as Notifications from 'expo-notifications';
import type { NotificationFrequency } from '../types/app';

export const notificationService = {
  async ensurePermission(): Promise<boolean> {
    const { status } = await Notifications.getPermissionsAsync();
    if (status === 'granted') {
      return true;
    }
    const request = await Notifications.requestPermissionsAsync();
    return request.status === 'granted';
  },

  async scheduleDailyReminder(frequency: NotificationFrequency) {
    // Bu fonksiyon ileride gerçek bildirim planlamasıyla güncellenecek.
    // Şimdilik sadece mevcut bildirimleri temizleyip basit bir log bırakıyoruz.
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log(`Bildirim sıklığı ayarlandı: ${frequency}`);
  },

  async disableReminders() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },
};
