import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  notificationService,
  type NotificationPermissionState,
} from '../services/notificationService';
import { registerServiceWorker } from '../services/serviceWorkerRegistration';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermissionState>(
    notificationService.getPermission()
  );

  useEffect(() => {
    registerServiceWorker();
  }, []);

  const requestPermission = useCallback(async () => {
    const result = await notificationService.requestPermission();
    setPermission(result);

    if (result === 'granted') {
      toast.success('Notifications enabled');
      await notificationService.show({
        title: '🎉 Notifications enabled!',
        body: "You'll now receive real-time updates from Healthcare SaaS.",
        tag: 'welcome',
      });
    } else if (result === 'denied') {
      toast.error('Notifications blocked. Please enable in browser settings.');
    }

    return result;
  }, []);

  const sendTestNotification = useCallback(async () => {
    if (permission !== 'granted') {
      const result = await requestPermission();
      if (result !== 'granted') return;
    }

    const messages = [
      {
        title: '🏥 New patient admitted',
        body: 'Aarav Sharma was admitted to Cardiology.',
      },
      {
        title: '⚠️ Critical alert',
        body: 'Patient PT-01023 requires immediate attention.',
      },
      {
        title: '📅 Appointment reminder',
        body: 'You have 3 appointments scheduled for today.',
      },
      {
        title: '✅ Lab results ready',
        body: 'Blood work for Priya Patel is now available.',
      },
    ];

    const random = messages[Math.floor(Math.random() * messages.length)];
    await notificationService.show({
      ...random,
      tag: `test-${Date.now()}`,
    });
  }, [permission, requestPermission]);

  return {
    permission,
    isSupported: notificationService.isSupported(),
    requestPermission,
    sendTestNotification,
  };
};