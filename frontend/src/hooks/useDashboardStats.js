import { useQuery } from '@tanstack/react-query';
import { getAdminDashboardStats, getWeeklyActivity } from '../api/activityApi';

export const useDashboardStats = () => {
  const statsQuery = useQuery({ queryKey: ['dashboardStats'], queryFn: getAdminDashboardStats });
  const weeklyQuery = useQuery({ queryKey: ['weeklyActivity'], queryFn: getWeeklyActivity });

  return {
    stats: statsQuery.data ?? {},
    weeklyActivity: weeklyQuery.data ?? [],
    isLoading: statsQuery.isLoading || weeklyQuery.isLoading,
  };
};
