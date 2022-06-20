import React, { useEffect, useState } from 'react';
import _ from 'lodash';

export default function UserCreate() {
  const [showPassword, setShowPassword] = React.useState(false);
  const onShowPasswordClick = event => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  const [showPwConfirm, setShowPwConfirm] = React.useState(false);
  const onShowPwConfirmClick = event => {
    event.preventDefault();
    setShowPwConfirm(!showPwConfirm);
  };
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('password');
  const [passwordConfirmation, setPasswordConfirmation] = useState('password');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const metaCsrfToken = document.querySelector('[name="csrf-token"]');
    setCsrfToken(metaCsrfToken?.getAttribute('content'));
    setPassword('password');
    setPasswordConfirmation('password');
  }, []);

  const onSubmitHandler = async event => {
    event.preventDefault();
    console.log('Submitting form to Rails server...');

    if (_.isEmpty(password) || _.isEmpty(passwordConfirmation)) {
      alert('Passwords are empty!');
      return;
    }

    if (!_.isEqual(password, passwordConfirmation)) {
      alert('Passwords do not match!');
      return;
    }

    const postData = async () => {
      const body = {
        commit: 'Create',
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      };

      console.log(body);

      const response = await fetch('http://localhost:3000/users/', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': `${csrfToken}`,
        },
      });

      const jsonData = await response.json();

      console.log('RESPONSE: ', jsonData);
    };

    await postData();

    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
    setShowPassword(false);
    setShowPwConfirm(false);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>Email:</label>
          <input
            value={email}
            type="text"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input name="csrfToken" value={csrfToken} type="hidden" />
          <label>Password:</label>
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type={showPassword ? 'text' : 'password'}
          />
          <button onClick={onShowPasswordClick}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            onChange={e => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
            type={showPwConfirm ? 'text' : 'password'}
          />
          <button onClick={onShowPwConfirmClick}>
            {showPwConfirm ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
}
