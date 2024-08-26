import { backendApi } from '@/api/backendApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

type LoginError = {
  ok: false;
  message: string;
};

type LoginSuccess = {
  ok: true;
  user: User;
  token: string;
};

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginSuccess | LoginError> => {
  try {
    const { data } = await backendApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        ok: false,
        message: error.response?.data.message || error.message,
      };
    }

    throw new Error('Unexpected error');
  }
};
