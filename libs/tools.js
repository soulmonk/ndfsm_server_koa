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

function randomInt(from = 0, to = 10) {
  return Math.floor(Math.random() * to) + from;
}

function dump(obj, title = '') {
  if (!title) {
    title = new Date().toISOString();
  }

  console.log(title, JSON.stringify(obj));
}

module.exports = {
  randomString,
  randomInt,
  dump
};
