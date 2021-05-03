// started from: https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/

import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, userSelector } from './userSlice'
import toast from 'react-hot-toast'

const Login = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm();
  const { isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isError) {
      // TODO: toast isn't actually showing a message anywhere
      console.log(errorMessage);
      toast.error(errorMessage);
    }
    if (isSuccess) {
      history.push('/');
    }
  }, [isError, isSuccess]);

  return (
    <Fragment>
      <div>
        <h2>
          Log In
        </h2>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div>Username: <input {...register('username')} placeholder="login" /></div>
            <div>Password: <input {...register('password')} placeholder="password" /></div>

            <input type="submit" />

          </form>

          <div>
            <span>
              <Link to="signup">Sign Up</Link>
            </span>
          </div>
        </div>

      </div>
    </Fragment>
  );
};

export default Login
