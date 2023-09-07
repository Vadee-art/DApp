import { NotificationType } from '@/components/Notifications/Notification';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

type NotificationsStore = {
  notifications: NotificationType[];
  addNotification: (notification: Omit<NotificationType, 'id'>) => void;
  dismissNotification: (id: string) => void;
};

export const useNotificationStore = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification: (notification) => {
    if (notification.duration === undefined) {
      notification.duration = 15;
    }
    const id = nanoid();
    const newNotification = { id, ...notification };
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    if (notification.duration) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, notification.duration * 1000);
    }
  },
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
