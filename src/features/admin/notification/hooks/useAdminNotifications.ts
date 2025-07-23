// import { useState, useEffect, useCallback } from 'react';
// import api from '../../../../lib/api';

// export type AdminNotification = {
//   id: string;
//   message: string;
//   timestamp: string;
//   isRead: boolean;
//   type: 'purchase' | 'system' | 'alert';
//   buyer?: {
//     name: string;
//     company?: string;
//   };
//   items?: {
//     name: string;
//     quantity: number;
//     variant?: string;
//   }[];
// };

// export const useAdminNotifications = () => {
//   const [notifications, setNotifications] = useState<AdminNotification[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [unreadCount, setUnreadCount] = useState(0);

//   const fetchNotifications = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/admin/notifications');
//       setNotifications(response.data);
//       setUnreadCount(response.data.filter((n: AdminNotification) => !n.isRead).length);
//     } catch (err) {
//       setError('Failed to fetch notifications');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const markAsRead = useCallback(async (id: string) => {
//     try {
//       await api.patch(`/admin/notifications/${id}/read`);
//       setNotifications(prev => 
//         prev.map(n => n.id === id ? {...n, isRead: true} : n)
//       );
//       setUnreadCount(prev => prev - 1);
//     } catch (err) {
//       console.error('Failed to mark notification as read', err);
//     }
//   }, []);

//   const markAllAsRead = useCallback(async () => {
//     try {
//       await api.patch('/admin/notifications/read-all');
//       setNotifications(prev => 
//         prev.map(n => ({...n, isRead: true}))
//       );
//       setUnreadCount(0);
//     } catch (err) {
//       console.error('Failed to mark all notifications as read', err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchNotifications();
    
//     const interval = setInterval(fetchNotifications, 30000);
//     return () => clearInterval(interval);
//   }, [fetchNotifications]);

//   return {
//     notifications,
//     loading,
//     error,
//     unreadCount,
//     fetchNotifications,
//     markAsRead,
//     markAllAsRead,
//   };
// };





// src/features/admin/notification/hooks/useAdminNotifications.ts

import { useCallback, useEffect, useState } from "react";
import type { AdminNotification } from "../types";
import api from "../../../../lib/api";

export const useAdminNotifications = () => {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/notifications");
      setNotifications(res.data);
      setUnreadCount(res.data.filter((n: AdminNotification) => !n.isRead).length);
    } catch (err) {
      setError("Failed to load notifications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    error,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
};
