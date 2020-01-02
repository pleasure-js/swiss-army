/**
 * @typedef {Array} ValueValidator
 * @property {*} 0 - The value to match
 * @property {String|Error} 1 - Custom error to throw in case does not match
 */

/**
 * @typedef {Object} SchemaField
 * @property {Object} field
 * @property {String} field.name - Name of the field
 * @property {*} field.type - Validates if given value is instance of `type`. When `type` is instance of SchemaField,
 * it triggers its validation method it instead.
 * @property {String[]} [field.enum] - Alternatively only matches one of the given values
 * @property {Number|ValueValidator} [field.minlength] - Minimum length of the value (for string types)
 * @property {Number|ValueValidator} [field.maxlength] - Maximum length of the value (for string types)
 * @property {Boolean|ValueValidator} [field.required] - Whether the value is required or not
 * @property {RegExp|ValueValidator} [field.regex] - Matches regex
 * @property {Function} [field.filter] - Function that receives the initial value providing a way of modifying the value
 * of a field before it's initialized and tested against other hooks. Must return the final value.
 * @property {Promise} [field.validateAsync] - Promised function that receives the value being treated and must
 * resolve or reject.
 * @property {Function} [field.validate] - Callback function that receives the value being treated and must
 * return true, false or throw a specific error.
 */

class SchemaField {
  constructor (field) {
    if (typeof field !== 'object') {
      throw new Error(`Invalid field`)
    }

    const expectedFields = ['name', 'enum', 'minlength', 'maxlength', 'required', 'regex', 'filter', 'validateAsync', 'validate']
    Object.keys(field).forEach(fieldName => {
      if (expectedFields.indexOf(fieldName) === -1) {
        throw new Error(`Invalid field`)
      }
    })

    Object.assign(this, field)
  }

  get type () {

  }
}

/**
 * Validates an object schema. Inspired by mongoose.
 *
 * Lifecycle:
 * - Validate lifecycle: filter, type, required, maxlength, minlength, regex, and validate, in that order.
 * - ValidateAsync lifecycle: validate lifecycle + validateAsync.
 *
 * @example
 *
 * ```js
 * const LocationValidation
 * const UserSchema = new SchemaValidator({
 *   name: {
 *     type: String,
 *     required: true
 *   },
 *   email: {
 *     type: String,
 *     maxlength: 120,
 *     required: true,
 *     regex: [/^[a-z0-9._]+@[a-z0-9-.]+\.[a-z]{2,}$/, `{{ value }} is not a valid e-mail address`],
 *     async validate (value) {
 *       // maybe check a db for a duplicate entry
 *       return true
 *     }
 *   },
 *   birthday: {
 *     type: Date,
 *     required: true,
 *     validateSync() {
 *
 *     },
 *     async validate (value) {
 *       // maybe check a db for a duplicate entry
 *       return true
 *     },
 *     filter (value) {
 *       return !(value typeof Date) ? new Date(value) : value
 *     }
 *   }
 * })
 *
 * // you may want to be able to validate that certain data structure is as expected (validate method)
 * // before proceeding with further validations or operations that would actually cause an overhead
 * const CleanUser = UserSchema.validate({
 *   name: 'Martin Rafael',
 *   email: 'tin@devtin.io',
 *   birthday: '6/11/1983',
 *
 * })
 *
 * console.log(CleanUser.birthday instanceof Date) // => true
 * ```
 */
export class SchemaValidator {
  constructor (schema, { strict = true } = {}) {
    this._schema = schema
    this._strict = strict
  }

  get fields () {
    return Object.keys(this._schema)
  }

  get type () {
    return this._schema.type
  }

  static valueValidation (value, schema) {

  }

  validateSync (field, value) {
  }

  async validateAsync () {
  }
}
