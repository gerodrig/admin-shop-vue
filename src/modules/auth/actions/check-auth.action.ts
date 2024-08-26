import { backendApi } from '@/api/backendApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

type CheckAuthError = {
  ok: false;
};

type CheckAuthSuccess = {
  ok: true;
  user: User;
  token: string;
};

export const checkAuthAction = async (): Promise<CheckAuthError | CheckAuthSuccess> => {
  try {
    const localToken = localStorage.getItem('token');
    if (localToken && localToken?.length < 10) {
      return {
        ok: false,
      };
    }
    const { data } = await backendApi.get<AuthResponse>('/auth/check-status');
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if(isAxiosError(error)) {
      return {
        ok: false,
      };
    }
    throw new Error('Unexpected error');
  }
};
