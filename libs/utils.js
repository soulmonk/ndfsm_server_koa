'use strict';

function randomString(size) {
  const randomSource = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const len = randomSource.length;

  let result = '';
  for (let i = 0; i < size; ++i) {
    result += randomSource[Math.floor(Math.random() * len)];
  }

  return result;
}

module.exports = {
  randomString
};
