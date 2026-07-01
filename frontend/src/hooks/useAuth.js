import { useMutation, useQuery } from '@tanstack/react-query';
import { getCurrentUser, login, logout } from '../api/authApi';

export const useAuth = () => {
  const userQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const token = response?.token ?? response?.data?.token;
      const user = response?.user ?? response?.data?.user;
      if (token) localStorage.setItem('smartHouseToken', token);
      if (user) localStorage.setItem('smartHouseUser', JSON.stringify(user));
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.href = '/login';
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isAuthenticated: Boolean(localStorage.getItem('smartHouseToken')),
  };
};
