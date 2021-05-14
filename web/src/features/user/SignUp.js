import React, { Fragment, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { signUpUser, userSelector } from './userSlice'
import toast from 'react-hot-toast'

const SignUp = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const { register, handleSubmit } = useForm()
  const { isSuccess, isError, errorMessage } = useSelector(
    userSelector
  )

  const onSubmit = (data) => {
    dispatch(signUpUser(data))
  }

  useEffect(() => {
    if (isError) {
      // TODO: toast isn't actually showing a message anywhere
      console.log(errorMessage)
      toast.error(errorMessage)
    }
    if (isSuccess) {
      history.push('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess])

  return (
    <Fragment>
      <div>
        <h2>
          Sign Up
        </h2>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div>Username: <input {...register('username')} placeholder="login" /></div>
            <div>Display Name: <input {...register('display_name')} placeholder="in-game name" /></div>
            <div>Email: <input {...register('email')} placeholder="login" /></div>
            <div>Password: <input {...register('password1')} placeholder="enter password" /></div>
            <div>Password: <input {...register('password2')} placeholder="enter it again" /></div>

            <input type="submit" />

          </form>

          { errorMessage &&
            <div>
              Error: { errorMessage }
            </div>
          }

        </div>

      </div>
    </Fragment>
  )
}

export default SignUp
