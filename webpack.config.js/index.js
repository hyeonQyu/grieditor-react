const development = require('./develoment');
const production = require('./production');
const asModule = require('./module');

const config = {
  development,
  production,
  module: asModule,
};

module.exports = (env) => {
  return config[Object.keys(env).filter((key) => !key.includes('WEBPACK'))[0]];
};
