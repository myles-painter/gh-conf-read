// External Libraries
const fs = require('fs');
const { formatError } = require('@gh-conf/gh-conf-response')
const { validatePath } = require('@gh-conf/gh-conf-validate');
const { addSlash } = require('@gh-conf/gh-conf-path');

// Constants
const GIT_CONFIG_PATH = '.git/config'


/**
 * Reads git config, by appending GIT_CONFIG_PATH to input path
 * @param {String} path 
 */
const readConf = (path) => {

  return new Promise((resolve, reject) => {

    // Validate input
    validatePath(path, GIT_CONFIG_PATH)

    // Check and add ending slash if does not exists
    path = addSlash(path);

    // Read config by path
    fs.readFile(`${path}${GIT_CONFIG_PATH}`, 'utf8', function (err, content) {
      if (err) {

        reject(formatError(`${path}${GIT_CONFIG_PATH} not found`, err));
      }

      resolve(content);
    });
  });
};


module.exports = readConf;
