import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string | number;
  name: string;
  email: string;
  image?: string;
}

interface AuthState {
  token: string | null;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN' | null;
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (token: string, role: 'PATIENT' | 'DOCTOR' | 'ADMIN', user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      user: null,
      isAuthenticated: false,

      login: (token, role, user) => set({ 
        token, 
        role, 
        user, 
        isAuthenticated: true 
      }),

      logout: () => set({ 
        token: null, 
        role: null, 
        user: null, 
        isAuthenticated: false 
      }),

      updateUser: (updatedUser) => set((state) => ({
        user: state.user ? { ...state.user, ...updatedUser } : null
      }))
    }),
    {
      name: 'swasth-bharat-auth', // This is the key used in localStorage
      // You can optionally pick which fields to persist
      // partialize: (state) => ({ token: state.token, role: state.role }),
    }
  )
);
