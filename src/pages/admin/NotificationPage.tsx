import { Button } from "../../components/ui/button";
import { BellIcon, CheckIcon, RefreshCwIcon } from "lucide-react";
import {
  useAdminNotifications,
  NotificationItem,
  NotificationListSkeleton,
} from "../../features/admin/notification";

export const NotificationPage = () => {
  const {
    notifications,
    loading,
    error,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  } = useAdminNotifications();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <BellIcon className="h-5 w-5" />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
        </h1>

        <div className="flex flex-wrap gap-2">
          <Button onClick={fetchNotifications} variant="outline" disabled={loading}>
            <RefreshCwIcon className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            onClick={markAllAsRead}
            disabled={loading || notifications.length === 0}
          >
            <CheckIcon className="h-4 w-4 mr-1" />
            Mark all as read
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {error && <div className="p-4 text-sm text-destructive">{error}</div>}

        {loading ? (
          <NotificationListSkeleton />
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No notifications
          </div>
        ) : (
          notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} onMarkAsRead={markAsRead} />
          ))
        )}
      </div>
    </div>
  );
};
