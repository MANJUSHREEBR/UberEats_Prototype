/* eslint-disable import/prefer-default-export */
import { API } from '../config';

export const signUp = (user) => fetch(`${API}/customer/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),

})
  .then((response) => response.json())
  .catch((err) => {
    console.log(err);
  });
