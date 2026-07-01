import { useQuery } from '@tanstack/react-query';
import { getActivityLogs } from '../api/activityApi';

export const useActivityLogs = ({ limit, scope = 'all' } = {}) => {
  return useQuery({
    queryKey: ['activityLogs', { limit, scope }],
    queryFn: () => getActivityLogs({ limit, scope }),
  });
};
