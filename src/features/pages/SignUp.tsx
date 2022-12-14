import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useAuth, { useAppDispatch } from '../../utils/useAuths';
import { signUp } from '../../utils/firebase';
import { setAuthError } from '../slices/userSlice';
import useProfileRedirect from '../../utils/useProfileRedirect';
import Error from '../../common/components/Error';

const SignupWrapper = styled.div`
  font-size: 0.8rem;
  width: 90%;
  border: solid 1px white;
  box-shadow: -5px 16px 87px -32px rgba(0, 0, 0, 0.42);
  -webkit-box-shadow: -5px 16px 87px -32px rgba(0, 0, 0, 0.42);
  -moz-box-shadow: -5px 16px 87px -32px rgba(0, 0, 0, 0.42);
  margin: 1px auto;
  background-color: #fcfbf4;
  display: flex;
  // margin-bottom: 100px;
  justify-content: center;
  border-radius: 30px;
  overflow: hidden;
  flex-wrap: wrap-reverse;
  .cancelbtn {
    padding: 14px 20px;
    background-color: #f44336;
  }
  section {
    width: 50%;
    min-width: 400px;
    background-color: rgba(2, 110, 199, 0.3);
    overflow: hidden;
    .image {
      width: 350px;
      height: 350px;
      margin: auto;
      object-fit: contain;
      border-radius: 50%;
      display: flex;
      align-items: center;
      border: solid 1px white;
      box-shadow: -5px 16px 87px -32px rgba(0, 0, 0, 0.42);
      -webkit-box-shadow: -5px 16px 87px -32px rgba(0, 0, 0, 0.42);
      -moz-box-shadow: -5px 16px 87px -32px rgba(0, 0, 0, 0.42);
    }
    h2 {
      text-align: center;
      width: 90%;
      margin: 45px auto;
      font-size: 2rem;
      color: #c3881c;
      text-transform: uppercase;
      text-shadow: 0px 3px 0 #78755a, 3px 13px 15px #aba8a8;
    }
  }
  main {
    margin: 10px auto;
    width: 40%;

    form {
      display: flex;
      margin-left: 50px;
      justify-content: center;
      flex-direction: column;
      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
      }
      .checkbox {
        input {
          display: inline-block;
          min-width: 20px !important;
          margin: 10px 0px;
        }
      }
      button {
        padding: 14px 20px;
        border-radius: 8px;
        border: 1px solid lightblue;
        background-color: green;
        color: white;
      }
      input {
        display: block;
        padding: 10px 8px;
        max-width: 300px;
        min-width: 250px;
        margin: 5px 0px;
        border: none;
        border-radius: 8px;
        border: solid 1px lightgray;
        &:focus {
          outline: solid 1px lightblue;
        }
      }
    }
  }
`;
const formDefaults = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  verifyPassword: '',
  isAdmin: false,
  displayName: '',
  uid: '',
  photoURL: ''
};
function SignUp() {
  const dispatch = useAppDispatch();
  const { authError } = useAuth();
  const [formData, setFormData] = useState(formDefaults);
  const { firstName, lastName, email, password, verifyPassword, displayName } = formData;
  useProfileRedirect();

  useEffect(() => {
    dispatch(setAuthError(''));
  }, [dispatch]);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { verifyPassword, ...userData } = formData;

    if (password !== verifyPassword) {
      dispatch(setAuthError('Passwords do not match!'));
      setFormData({ ...formData, password: '', verifyPassword: '' });
    } else {
      await signUp(userData);
      setFormData(formDefaults);
    }
  };

  return (
    <SignupWrapper>
      <main>
        <h2>Sign Up</h2>
        {authError && <Error message={authError} />}
        <form onSubmit={handleSubmit}>
          <label htmlFor='firstName'>
            First Name:
            <input
              id='firstName'
              type='firstName'
              name='firstName'
              value={firstName}
              placeholder='First Name'
              required
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor='lastName'>
            Last Name:
            <input
              id='lastName'
              type='lastName'
              name='lastName'
              value={lastName}
              placeholder='Last Name'
              required
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor='displayName'>
            Display Name:
            <input
              id='DisplayName'
              type='displayname'
              name='displayName'
              value={displayName}
              placeholder='display Name'
              required
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor='email'>
            Email:
            <input
              id='email'
              type='email'
              name='email'
              value={email}
              placeholder='sample@sample.com'
              required
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor='password'>
            Password:
            <input
              id='password'
              type='password'
              name='password'
              value={password}
              placeholder='*********'
              required
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor='verifyPassword'>
            Confirm Password:
            <input
              id='verifyPassword'
              type='password'
              name='verifyPassword'
              value={verifyPassword}
              placeholder='**********'
              required
              onChange={handleInputChange}
            />
          </label>
          <p>
            By creating an account you agree to our{' '}
            <a href='#top' style={{ color: 'dodgerblue' }}>
              Terms & Privacy
            </a>
          </p>
          <div className='clearfix'>
            <button className='register_button' type='submit' data-testid='custom-element' disabled={!formData}>
              <span>REGISTER</span>
            </button>
            <button type='button' className='cancelbtn'>
              CANCEL
            </button>
          </div>
        </form>
        <p>
          Already registered? <Link to='/signin'>Sign in</Link> instead!
        </p>
      </main>
      <section>
        <h2>Get Stronger with Effective Exercises.</h2>
        <div className='image'>
          <iframe
            src='https://giphy.com/embed/FaYaqb69AKg0g'
            width='400'
            // height="280"
            frameBorder='0'
            className='giphy-embed'
            allowFullScreen
            title='This is a unique title'
          />
        </div>
        {/* <iframe src="https://giphy.com/embed/FaYaqb69AKg0g" width="480" height="320" frameBorder="0" className="giphy-embed" allowFullScreen />
        <p>
          <a href="https://giphy.com/gifs/sexy-women-working-out-FaYaqb69AKg0g">via GIPHY</a>
        </p> */}
      </section>
    </SignupWrapper>
  );
}
export default SignUp;
