import Cookies from 'js-cookie';
import create, { StateCreator } from 'zustand';
import type { User, UserStore } from './types/userStore.types';
import { getLocalStorageValue, setLocalStorageValue } from '@/utils/storage';

const userInfo: StateCreator<UserStore> = (set, get) => ({
  user: getLocalStorageValue<User | null>('user', null),
  accessToken: Cookies.get('accessToken') || null,
  refreshToken: Cookies.get('refreshToken') || null,
  setAccessToken: (token: string) => {
    Cookies.set('accessToken', token, { expires: 1 });
    set({ accessToken: token });
  },
  setRefreshToken: (token: string) => {
    Cookies.set('refreshToken', token, { expires: 10 });
    set({ refreshToken: token });
  },
  setUser: (user: User) => {
    setLocalStorageValue<User>('user', user);
    set({ user });
  },
  logout: () => {
    localStorage.removeItem('user');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    set({ user: null, accessToken: null, refreshToken: null });
  },
});

// Export the useStore hook for your store
export const useUserStore = create<UserStore>(userInfo);
