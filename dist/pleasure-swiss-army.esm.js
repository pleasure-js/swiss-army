/*!
 * pleasure-swiss-army v1.0.0
 * (c) 2019-2019 Martin Rafael <tin@devtin.io>
 * MIT
 */
import kebabCase from 'lodash/kebabCase';
import { spawn } from 'child_process';

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
    const cmd = spawn(cmdArgs[0], cmdArgs.slice(1), {
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
      errors.push(comingError.toString());
    });

    cmd.on('error', error => reject({ error, errors }));

    cmd.on('exit', () => {
      resolve({ result: result.join(`\n`), errors: errors.join(`\n`) });
    });
  })
}

var cli = /*#__PURE__*/Object.freeze({
  __proto__: null,
  obj2ArgsArray: obj2ArgsArray,
  exec: exec
});

export { cli as Cli };
