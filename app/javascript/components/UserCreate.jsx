import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import Input from './ui/Input.jsx';
import InputButtonLeft from './ui/InputButtonLeft.jsx';
import InputButtonRight from './ui/InputButtonRight.jsx';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const metaCsrfToken = document.querySelector('[name="csrf-token"]');
    setCsrfToken(metaCsrfToken?.getAttribute('content'));
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
        <Input
          value={email}
          label="Email:"
          onChange={e => setEmail(e.target.value)}
          id="email"
          name="email-input"
          type="text"
          placeholder="Email Address"
          autocomplete="email-address"
        />
        <InputButtonLeft
          value={password}
          label="Password:"
          onChange={e => setPassword(e.target.value)}
          id="password"
          name="password-input"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          autocomplete={null}
          buttonOnClick={onShowPasswordClick}
          buttonText={showPassword ? 'Hide' : 'Show'}
        />
        <InputButtonRight
          value={passwordConfirmation}
          label="Password Confirmation:"
          onChange={e => setPasswordConfirmation(e.target.value)}
          id="password-confirmation"
          name="password-confirmation-input"
          type={showPwConfirm ? 'text' : 'password'}
          placeholder="Password Confirmation"
          autocomplete={null}
          buttonOnClick={onShowPwConfirmClick}
          buttonText={showPwConfirm ? 'Hide' : 'Show'}
        />
        <div className="text-right">
          <button
            type="submit"
            value="Submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
