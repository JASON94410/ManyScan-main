import { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, logoutAction } from './authSlice';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const login = (userData) => {
    dispatch(loginAction(userData));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// import { createContext, useContext } from 'react';
// import { useSelector } from 'react-redux';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const user = useSelector((state) => state.auth.user);
//   const token = useSelector((state) => state.auth.token);

//   return (
//     <AuthContext.Provider value={{ user, token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
