const fs = require('fs');
const path = require('path');

const DIST_DIRECTORY_NAME = 'dist';

const removeDistDirectoryName = (config, propNames) => {
  const distDirectorySubPath = `${DIST_DIRECTORY_NAME}/`;
  propNames.forEach((propName) => {
    if (config[propName]?.startsWith(distDirectorySubPath)) {
      config[propName] = config[propName].slice(distDirectorySubPath.length);
    }
  });
};

module.exports = () => {
  const root = path.join(__dirname, '../..');
  const source = JSON.parse(fs.readFileSync(path.join(root, '/package.json').toString('utf-8')));
  const packageConfig = {
    ...source,
    scripts: {},
    devDependencies: {},
  };

  removeDistDirectoryName(packageConfig, ['main', 'types']);

  const distDir = path.join(root, `/${DIST_DIRECTORY_NAME}`);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  fs.writeFileSync(path.join(distDir, '/package.json'), Buffer.from(JSON.stringify(packageConfig, null, 2), 'utf-8'));
  fs.writeFileSync(path.join(distDir, '/version.txt'), Buffer.from(packageConfig.version, 'utf-8'));
  fs.copyFileSync(path.join(root, '/.npmignore'), path.join(distDir, '/.npmignore'));
};
