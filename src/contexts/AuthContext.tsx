import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'editor' | 'viewer';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@demo.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@demo.com',
      name: 'Admin User',
      role: 'admin'
    }
  },
  'editor@demo.com': {
    password: 'editor123',
    user: {
      id: '2',
      email: 'editor@demo.com',
      name: 'Editor User',
      role: 'editor'
    }
  },
  'viewer@demo.com': {
    password: 'viewer123',
    user: {
      id: '3',
      email: 'viewer@demo.com',
      name: 'Viewer User',
      role: 'viewer'
    }
  }
};

const rolePermissions: Record<UserRole, string[]> = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  editor: ['read', 'write'],
  viewer: ['read']
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email];
    
    if (mockUser && mockUser.password === password) {
      const token = `mock_token_${Date.now()}`;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(mockUser.user));
      
      setState({
        user: mockUser.user,
        isAuthenticated: true,
        isLoading: false
      });
      
      return true;
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const hasPermission = (permission: string): boolean => {
    if (!state.user) return false;
    return rolePermissions[state.user.role].includes(permission);
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}