/*!
 * pleasure-swiss-army v1.0.0
 * (c) 2019-2019 Martin Rafael <tin@devtin.io>
 * MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var kebabCase = _interopDefault(require('lodash/kebabCase'));
var child_process = require('child_process');

function debug (d) {
  exports.debugging = !!d;
}

exports.debugging = false;

/**
 * @module pleasure-swiss-army/Cli
 * @desc Set of utilities for cli applications
 */

/**
 * Converts given object into an array of arguments
 * @param {Object} obj
 * @return {Array} Arguments array
 *
 * @example
 *
 * ```js
 * const args = {
 *   noLockfile: true,
 *   ignoreEngines: false,
 *   json: true
 * }
 *
 * obj2ArgsArray(args)
 * // outputs: ['--no-lockfile', '--json']
 * ```
 */
function obj2ArgsArray (obj) {
  const args = [];
  Object.keys(obj).forEach(arg => {
    obj[arg] && args.push(`--${ kebabCase(arg) }`);
  });
  return args
}

/**
 * @typedef {Object} module:pleasure-swiss-army/Cli~ExecResult
 * @property {String} result - Resulted output from stdout
 * @property {String} errors - Any errors received via stderr
 */

/**
 * Uses an spawn process to execute given command
 * @param {String} command - The command to execute
 * @param {Object} [args] - Object to be converted as terminal kind of parameters using `obj2ArgsArray`
 * @param {String} cwd=process.cwd() - Object to pass as the env of the child process
 * @param {Object} env=process.env - Object to pass as the env of the child process
 * @param {Object} env=process.env - Object to pass as the env of the child process
 * @param {Function} [progress] - Callback function that receives the progress of the operation
 * @return {Promise<module:pleasure-swiss-army/Cli~ExecResult>} The child process output
 * @throws {Error} stderr output if any
 */

function exec (command, { args = {}, env = process.env, cwd = process.cwd(), progress } = {}) {
  return new Promise((resolve, reject) => {
    const cmdArgs = (command || '').split(' ').concat(obj2ArgsArray(args)).filter(Boolean);
    if (exports.debugging) {
      console.log(cmdArgs);
    }
    const cmd = child_process.spawn(cmdArgs[0], cmdArgs.slice(1), {
      cwd,
      env
    });

    const result = [];
    const errors = [];

    cmd.stdout.on('data', (comingData) => {
      comingData = comingData.toString();
      result.push(comingData);
      progress && progress(comingData);
    });

    cmd.stderr.on('data', (comingError) => {
      exports.debugging && console.log(`pleasure-swiss-army~cli~exec::error`, comingError);
      errors.push(comingError.toString());
    });

    cmd.on('error', error => reject({ error, errors }));

    cmd.on('exit', () => {
      exports.debugging && console.log(`pleasure-swiss-army~cli~exec::exit`, { result: result.join(`\n`), errors: errors.join(`\n`) });
      resolve({ result: result.join(`\n`), errors: errors.join(`\n`) });
    });
  })
}

var cli = /*#__PURE__*/Object.freeze({
  __proto__: null,
  obj2ArgsArray: obj2ArgsArray,
  exec: exec
});

exports.Cli = cli;
exports.debug = debug;
