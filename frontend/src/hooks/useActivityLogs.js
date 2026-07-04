import { useQuery } from '@tanstack/react-query';
import { getActivityLogs } from '../api/activityApi';

export const useActivityLogs = ({ pageNo = 1, pageSize = 10, scope = 'all', limit } = {}) => {
  const queryKey = limit !== undefined ? ['activityLogs', { limit, scope }] : ['activityLogs', { pageNo, pageSize, scope }];
  const queryFn = limit !== undefined ? () => getActivityLogs({ limit, scope }) : () => getActivityLogs({ pageNo, pageSize, scope });

  return useQuery({
    queryKey,
    queryFn,
  });
};
