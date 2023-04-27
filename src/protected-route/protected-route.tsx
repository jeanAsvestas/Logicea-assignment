import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../app/store/userReducer';
import { Login } from '../pages/login-page/Login';
import { useEffect, useState } from 'react';
interface ProtectedProps {
  children: JSX.Element;
}
export const ProtectedRoute = ({ children }: ProtectedProps) => {
  const selectorData = useSelector(selectUser);
  const [user, setUser] = useState(selectorData);

  useEffect(() => {
    setUser(selectorData);
    return;
  }, [selectorData]);

  if (user) {
    return children ? children : <Outlet />;
  } else {
    return <Login />;
  }
};
