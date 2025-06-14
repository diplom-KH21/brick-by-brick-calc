
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (username: string, password: string) => Promise<{ error: any }>;
  signIn: (username: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем сохраненную сессию в localStorage
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (username: string, password: string) => {
    try {
      const { data, error } = await supabase.rpc('create_user', {
        p_username: username,
        p_password: password
      });

      if (error) {
        return { error };
      }

      const newUser = { id: data, username };
      setUser(newUser);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      const { data, error } = await supabase.rpc('authenticate_user', {
        p_username: username,
        p_password: password
      });

      if (error || !data || data.length === 0) {
        return { error: { message: 'Неправильний логін або пароль' } };
      }

      const userData = data[0];
      const authenticatedUser = { id: userData.user_id, username: userData.username };
      setUser(authenticatedUser);
      localStorage.setItem('auth_user', JSON.stringify(authenticatedUser));
      
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
