const development = require('./env/develoment');
const production = require('./env/production');
const asModule = require('./env/module');
const setupPackage = require('./callbacks/setupPackage');

const callback = {
  development: () => {},
  production: () => {},
  module: setupPackage,
};

const config = {
  development,
  production,
  module: asModule,
};

module.exports = (option) => {
  const env = Object.keys(option).filter((key) => !key.includes('WEBPACK'))[0];
  callback[env]();
  return config[env];
};
