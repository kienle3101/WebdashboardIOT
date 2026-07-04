import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDevices, toggleDeviceState, createDevice } from '../api/deviceApi';

export const useDevices = () => {
  const queryClient = useQueryClient();

  const devicesQuery = useQuery({
    queryKey: ['devices'],
    queryFn: getDevices,
  });

  const toggleMutation = useMutation({
    mutationFn: ({ deviceCode, deviceType, currentStatus }) => toggleDeviceState({ deviceCode, deviceType, currentStatus }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['devices'] }),
  });

  const createMutation = useMutation({
    mutationFn: ({ deviceCode, deviceName, deviceType, currentStatus }) => createDevice({ deviceCode, deviceName, deviceType, currentStatus }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['devices'] }),
  });

  return {
    devices: devicesQuery.data ?? [],
    isLoading: devicesQuery.isLoading,
    toggleDevice: toggleMutation.mutateAsync,
    isToggling: toggleMutation.isLoading,
    createDevice: createMutation.mutateAsync,
    isCreating: createMutation.isLoading,
  };
};
