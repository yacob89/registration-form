import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import axios from 'axios';

import Users from './tests/Users';
import Emails from './tests/Emails';
import Mobiles from './tests/Mobiles';
jest.mock('axios');

test('renders login link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  return Users.all().then(data => expect(data).toEqual(users));
});

test('should fetch emails', () => {
  const emails = [{name: 'Bob'}];
  const resp = {data: emails};
  axios.get.mockResolvedValue(resp);

  return Emails.all().then(data => expect(data).toEqual(emails));
});

test('should fetch mobiles', () => {
  const mobiles = [{name: 'Bob'}];
  const resp = {data: mobiles};
  axios.get.mockResolvedValue(resp);

  return Mobiles.all().then(data => expect(data).toEqual(mobiles));
});
