/* webpack config */

const encrypt = require('crypto');
const fs = require('fs');
const path = require('path');
const argv = process.argv;
const cmdArg = argv[argv.length - 1].match(/^[^\.]+$/g) || ['dev'];
const cmdArgs = cmdArg[0].match(/[^\#]+/g) || [];
const versionDate = new Date((new Date()).getTime() - (new Date()).getTimezoneOffset() * 60000);
const versionBMT = versionDate.toISOString().split('.')[0].replace(/[\-T:]/g, '_');
const packageJSON = require('./package.json');
const packageHash = encrypt.createHash('md5').update(JSON.stringify(packageJSON.dependencies)).digest('hex');
const webpackConfig = {};
const configVar = {
  version: versionBMT,
  vendorHash: packageHash,
  env: { appDir: __dirname },
  pages: []
};


const cmdArgFunctions = {
  dev: () => {
    let configFile = require(configVar.env.appDir + '/config/config.dev.js');
    configVar.env.appEnv = 'development';
    Object.assign(webpackConfig, configFile(configVar));
  },
  test: () => {
    let configFile = require(configVar.env.appDir + '/config/config.test.js');
    configVar.env.appEnv = 'test';
    Object.assign(webpackConfig, configFile(configVar));
  },
  prod: () => {
    let configFile = require(configVar.env.appDir + '/config/config.prod.js');
    configVar.env.appEnv = 'production';
    Object.assign(webpackConfig, configFile(configVar));
  },
};

const mapFileSync = (dirPath, option) => {
  const fileList = [];
  const mapDirFiles = (dirPath) => {
    const dirFiles = fs.readdirSync(dirPath);
    dirFiles.map((dirItem) => {
      const filePath = path.join(dirPath, dirItem);
      if (!option.ignore.test(filePath)) {
        if (fs.statSync(filePath).isDirectory()) {
          mapDirFiles(filePath);
        } else if (option.match.test(filePath)) {
          fileList.push(filePath);
        }
      }
    });
  }
  mapDirFiles(dirPath);
  return fileList;
}

const genRouteListFile = (routeList, isDev = false) => {
  const importList = () => routeList.map((route) => {
    return `import ${route.componentName} from '${route.importPath}'`;
  });
  const routeDict = () => routeList.map((route) => {
    return `pageRoutes['${route.routePath}'] = ${route.componentName}`;
  });
  const acceptHot = (isDev) => isDev ? `if ((process.env).NODE_ENV === 'development' && module.hot) { module.hot.accept() }\r\n\r\n` : '';

  const fileContent =
    `${importList().join('\r\n')}\r\n\r\n` +
    `const pageRoutes = {}\r\n` +
    `${routeDict().join('\r\n')}\r\n\r\n` +
    `${acceptHot(isDev)}` +
    `export default pageRoutes\r\n`
  return fs.writeFileSync(path.join(configVar.env.appDir, 'src', 'route.js'), fileContent);
}

(() => {
  const fileList = mapFileSync(path.join(configVar.env.appDir, 'src', 'pages'), { ignore: /node_modules/, match: /[^\w]main.jsx$/ });
  const routeList = [];
  Object.keys(cmdArgFunctions).map((argKey) => {
    if (argKey === cmdArgs[0]) {
      fileList.map((fullPath) => {
        const route = {};
        const pagePath = ((fullPath.split(path.join(configVar.env.appDir, 'src/pages')) || [])[1] || '').replace(/\\/g, '/');
        route.importPath = '@/pages' + pagePath.replace('.jsx', '');
        route.routePath = pagePath.replace('/main.jsx', '');
        route.componentName = 'PAGE' + route.routePath.replace(/[/\-]/g, '_').toUpperCase();
        console.log(`${route.importPath} => ${route.routePath}`);
        routeList.push(route);
      });
      genRouteListFile(routeList, argKey === 'dev');
      cmdArgFunctions[argKey]();
    }
  })
})()

console.log('\r\nLib hash:', packageHash);

module.exports = webpackConfig;
