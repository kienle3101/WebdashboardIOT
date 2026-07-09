import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteUser, getUsers, updateUserPermissions } from '../api/userApi';

export const useUsers = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const permissionsMutation = useMutation({
    mutationFn: updateUserPermissions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    users: usersQuery.data ?? [],
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    refetchUsers: usersQuery.refetch,

    deleteUser: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,

    updatePermissions: permissionsMutation.mutateAsync,
    isUpdatingPermissions: permissionsMutation.isPending,
  };
};