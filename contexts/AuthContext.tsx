import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { getApi } from '../services/api';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface Role {
  id: number;
  name: string;
  initials: string;
}

interface User {
  name: string;
  email: string;
  nickname: string;
  roles: Role[];
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const api = getApi();

  useEffect(() => {
    (async () => {
      const { access_token } = parseCookies();
      if (access_token) {
        const res = await api.get('users/personal-info');
        setUser(res.data);
      }
    })();
  }, []);
  const signIn = async (email: string, password: string) => {
    try {
      const res = await api.post('auth/login', { email, password });
      const { access_token, user: apiUser } = res.data;
      setUser(apiUser);

      setCookie(undefined, 'access_token', access_token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      if (apiUser?.roles[0]) {
        setCookie(undefined, 'user_role', apiUser?.roles[0].name, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        });
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      if (apiUser?.roles.find((role: Role) => role.name === 'TEACHER')) {
        Router.push('/teacher');
      }

      if (apiUser?.roles.find((role: Role) => role.name === 'STUDENT')) {
        Router.push('/student');
      }
    } catch (error) {}
  };
  const signOut = async () => {
    try {
      destroyCookie(undefined, 'access_token', { path: '/' });
      Router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
