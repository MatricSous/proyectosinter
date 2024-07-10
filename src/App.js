import { HashRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthenticated } from './app/authenticationSlice';
import AuthProvider from './providers/AuthProvider';
import { getAccessTokenApi } from './services/auth';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn , rol} = useSelector(state => state.authenticationSlice);

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token && token !== 'null' && token !== 'undefined') {
      dispatch(userAuthenticated({ token }));
    }
  }, [dispatch]);

  useEffect(() => {
    async function loadRoutes() {
      if (isLoggedIn) {
        console.log(isLoggedIn)
        console.log("logIn")
        console.log(rol)
        const { default: loggedInRoutes } = await import('./routes/index');
        setRoutes(loggedInRoutes);
      } else {
        console.log("NotLogIn")
        console.log(rol)
        const { default: loggedOutRoutes } = await import('./routes/indexLoggedOut');
        setRoutes(loggedOutRoutes);
      }
    }
    loadRoutes();
  }, [isLoggedIn]);

  return (
    <AuthProvider>
      <HashRouter>
        {routes.length > 0 ? (
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index.toString()}
                path={route.path}
                element={<route.layout><route.element /></route.layout>}
              />
            ))}
          </Routes>
        ) : null}
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
