import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { type User, AuthStatus } from '../interfaces';
import { checkAuthAction, loginAction, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);
      if (!loginResponse.ok) {
        // console.error(loginResponse.message);
        logout();
        return false;
      }

      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      return logout();
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResponse = await registerAction(fullName, email, password);
      if (!registerResponse.ok) {
        // console.error(registerResponse.message);
        throw new Error(registerResponse.message);
      }

      user.value = registerResponse.user;
      token.value = registerResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      return {
        ok: true,
        message: 'User registered successfully',
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Unexpected error',
      };
    }
  };

  const logout = () => {
    //? Delete the token from the local storage
    localStorage.removeItem('token');
    
    authStatus.value = AuthStatus.NotAuthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  const checkAuthStatus = async(): Promise<boolean> => {
    try {
      const statusResponse = await checkAuthAction();
      if (!statusResponse.ok) {
        logout();
        return false;
      }
      user.value = statusResponse.user;
      token.value = statusResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  return {
    // state
    user,
    token,
    authStatus,

    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

    
    //? a getter to know if the user is an admin
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),
    username: computed(() => user.value?.fullName),
    // Actions
    login,
    logout,
    register,
    checkAuthStatus
  };
});
