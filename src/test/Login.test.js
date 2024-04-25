// Login.test.js

import React from 'react';
import { render, screen, userEvent } from '@testing-library/react';
import Login from '../screens/Login'; // Your Login component

test('submits username and password', async () => {
  // ARRANGE
  const username = 'admin';
  const password = 'admin';
  const mockLogin = jest.fn(); // Mock your login function

  render(<Login onSubmit={mockLogin(username, password)} />);

  const usernameInput = screen.getByRole('textbox', { name: /Username/i });
  userEvent.type(usernameInput, 'admin');

  const passwordInput = screen.getByLabelText('Password');
  userEvent.type(passwordInput, 'admin');

  const loginButton = screen.getByRole('button', { name: /^Login$/i });
  expect(loginButton).not.toBeDisabled();

  // ACT
  userEvent.click(loginButton);

  // ASSERT
  await expect(mockLogin).toHaveBeenCalled();
  await expect(mockLogin).toHaveBeenCalledTimes(1);
  await expect(mockLogin).toHaveBeenCalledWith('myusername', 'pass1234');
});
