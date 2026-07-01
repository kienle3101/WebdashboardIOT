import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDevices, toggleDeviceState } from '../api/deviceApi';

export const useDevices = () => {
  const queryClient = useQueryClient();

  const devicesQuery = useQuery({
    queryKey: ['devices'],
    queryFn: getDevices,
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, status }) => toggleDeviceState(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['devices'] }),
  });

  return {
    devices: devicesQuery.data ?? [],
    isLoading: devicesQuery.isLoading,
    toggleDevice: toggleMutation.mutateAsync,
  };
};
