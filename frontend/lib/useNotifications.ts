"use client";

import { useState, useEffect } from 'react';

export type NotificationType = 'INVESTIGATION' | 'CLAIM' | 'EVIDENCE' | 'RISK' | 'SYSTEM';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'CLAIM',
    title: 'New Claim Assigned',
    message: 'Claim CLM-1042 requires review.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
    link: '/claims/CLM-1042'
  },
  {
    id: 'notif-2',
    type: 'EVIDENCE',
    title: 'Evidence Uploaded',
    message: 'New evidence uploaded to CLM-1038.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    link: '/claims/CLM-1038'
  },
  {
    id: 'notif-3',
    type: 'RISK',
    title: 'Risk Assessment Complete',
    message: 'Risk assessment completed for CLM-1029.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true,
    link: '/claims/CLM-1029'
  },
  {
    id: 'notif-4',
    type: 'INVESTIGATION',
    title: 'Report Ready',
    message: 'Investigation report is ready for review.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
    link: '/reports'
  },
  {
    id: 'notif-5',
    type: 'SYSTEM',
    title: 'System Maintenance',
    message: 'System maintenance scheduled for tonight at 2 AM.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    read: true,
  }
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  
  const loadNotifications = () => {
    try {
      const stored = localStorage.getItem('claimshield_notifications');
      if (stored) {
        setNotifications(JSON.parse(stored));
      } else {
        setNotifications(DEFAULT_NOTIFICATIONS);
        localStorage.setItem('claimshield_notifications', JSON.stringify(DEFAULT_NOTIFICATIONS));
      }
    } catch (e) {
      setNotifications(DEFAULT_NOTIFICATIONS);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNotifications();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'claimshield_notifications') loadNotifications();
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('claimshield_notifications_changed', loadNotifications);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('claimshield_notifications_changed', loadNotifications);
    };
  }, []);

  const save = (newNotifs: AppNotification[]) => {
    setNotifications(newNotifs);
    localStorage.setItem('claimshield_notifications', JSON.stringify(newNotifs));
    window.dispatchEvent(new Event('claimshield_notifications_changed'));
  };

  const markAsRead = (id: string) => {
    save(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    save(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    save(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    save([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  };
}
