import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Alert } from 'react-native';

// Types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state
    // This is where you would check for existing auth tokens/sessions
    setLoading(false);
  }, []);

  const signInWithEmail = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      
      // TODO: Implement actual email/password sign in
      // This is a mock implementation
      if (email && password) {
        const mockUser: User = {
          id: 'mock-user-id',
          email: email,
          displayName: email.split('@')[0],
          emailVerified: true,
        };
        setUser(mockUser);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      
      // TODO: Implement actual email/password sign up
      // This is a mock implementation
      if (email && password && password.length >= 6) {
        const mockUser: User = {
          id: 'mock-user-id-new',
          email: email,
          displayName: email.split('@')[0],
          emailVerified: false,
        };
        setUser(mockUser);
      } else {
        throw new Error('Invalid email or password (minimum 6 characters)');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // TODO: Implement actual sign out
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email: string): Promise<void> => {
    try {
      setLoading(true);
      
      // TODO: Implement actual password reset
      // This is a mock implementation
      if (email) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        throw new Error('Invalid email address');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // TODO: Implement Google Sign In
      Alert.alert('Coming Soon', 'Google Sign In will be implemented soon');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithApple = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // TODO: Implement Apple Sign In
      Alert.alert('Coming Soon', 'Apple Sign In will be implemented soon');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    sendPasswordReset,
    signInWithGoogle,
    signInWithApple,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
