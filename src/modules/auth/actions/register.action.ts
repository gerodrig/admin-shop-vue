import { backendApi } from '@/api/backendApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

type RegisterError = {
  ok: false;
  message: string;
};

type RegisterSuccess = {
  ok: true;
  user: User;
  token: string;
};

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<RegisterSuccess | RegisterError> => {
  try {
    const { data } = await backendApi.post<AuthResponse>('/auth/register', {
      fullName,
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
