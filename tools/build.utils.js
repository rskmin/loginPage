const path = require('path');
const fs = require('fs');
const resolve = (pathname) => path.join(__dirname, '../', pathname);
const join = path.join;
const webpack = require('webpack');

module.exports = {
  path,
  fs,
  resolve,
  join,
  webpack,
  PROD: 'production',
  DEV: 'development',
  isProd: process.env.NODE_ENV === 'production', // 当前是否为生产模式
  isDev: process.env.NODE_ENV === 'development',
};