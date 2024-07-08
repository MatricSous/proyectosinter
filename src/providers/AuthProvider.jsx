import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { jwtDecode } from 'jwt-decode';
import {
  getAccessTokenApi,
} from '../services/auth';

const { default: jwt_decode } = require("jwt-decode");


// export const logoutAction = () => {
//   logout();
//   navigate('/login');
//   // window.location.href = '/login';
// };

const checkUserLogin = async (setUser) => {
  const accessToken = await getAccessTokenApi(); //retornar acces toketn
  if (accessToken) {
    setUser({
      isLoading: false,
      user: jwtDecode(accessToken),
    });
  }
  //else
};

export const AuthContext = createContext();

function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });
  useEffect(() => {
    if (user.isLoading) {
      checkUserLogin(setUser);
    }
  }, [user]);


  const mapChange = useCallback((response) => {
    return response;
  }, []);


  const providerData = useMemo(
    () => ({
      ...user,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={providerData}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
