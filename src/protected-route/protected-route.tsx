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
  // const dispatch = useDispatch();

  useEffect(() => {
    setUser(selectorData);
    return;
  }, [selectorData]);
  // useEffect(() => {

  //   const unsubsrcibe = auth.onAuthStateChanged((userAuth) => {
  //     if (userAuth) {
  //       // console.log(userAuth);
  //       dispatch(
  //         userActions.login({
  //           id: userAuth.uid,
  //           email: userAuth.email,
  //         })
  //       );
  //     } else {
  //       dispatch(userActions.logout());
  //     }
  //   });
  //   return unsubsrcibe;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);
  // useEffect(() => {
  //   const unsubsrcibe = () => {
  //     if (user) {
  //       // console.log(userAuth);
  //       dispatch(userActions.login('generic-token'));
  //     } else {
  //       dispatch(userActions.logout());
  //     }
  //   };
  //   return unsubsrcibe;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (user) {
    return children ? children : <Outlet />;
  } else {
    return <Login />;
  }
};
