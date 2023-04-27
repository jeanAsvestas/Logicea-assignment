import './Login.scss';
import { useDispatch } from 'react-redux';
import { userActions } from '../../app/store/userReducer';
import { Button } from '@mui/material';

export const Login = () => {
  const dispatch = useDispatch();
  return (
    <div className="login__container">
      <h2>Welcome to Jokes</h2>
      <Button
        variant="outlined"
        onClick={() => dispatch(userActions.login('generic-token'))}
      >
        Sign in
      </Button>
    </div>
  );
};
