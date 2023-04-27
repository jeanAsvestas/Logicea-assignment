import './navigation-bar.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, userActions } from '../../app/store/userReducer';
import { Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export const NavBar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, handleShow] = useState(false);
  const [checked, setChecked] = useState(false);

  const navBarTransition = () => {
    if (window.scrollY > 100) {
      handleShow(true);
      return;
    }
    handleShow(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', navBarTransition);
    return () => window.removeEventListener('scroll', navBarTransition);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  useEffect(() => {
    if (checked === false) {
      document.body.className = 'light';
    } else {
      document.body.className = 'dark';
    }
  }, [checked]);

  return (
    <div className={`navBar ${show && 'navBar__black'}`}>
      <div className="navBar__contents">
        <Button className="navBar__button-logo" onClick={() => navigate('/')}>
          Jokes
        </Button>
        <div className="navBar__contents-right">
          {user ? (
            <Button
              className="navBar__button-logout"
              onClick={() => {
                dispatch(userActions.logout());
                navigate('/');
                window.location.reload();
              }}
            >
              Logout
            </Button>
          ) : null}
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Dark Mode"
          />
        </div>
      </div>
    </div>
  );
};
