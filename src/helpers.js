const LOGS = process.env.NODE_ENV !== 'production'

/**
 * Model class
 */
class Model {
  update (data) {
    if (LOGS) {
      console.log('Update model values.', data)
    }
    _setValues(this, this.model, data)
    return this
  }

  reset () {
    if (LOGS) {
      console.log('Reset model values.')
    }
    _setValues(this, this.model)
    return this
  }
}

/**
 * Require helper
 * @param filename {string}
 * @returns {object}
 * @private
 */
export function _require (filename) {
  let model = null
  try {
    model = require('../models/' + filename + '.js').default
  } catch (e) {
    console.warn(`Cannot find model "${filename}" in /modules directory.`)
  }
  return model
}

/**
 * Create new entity helper
 * @param name {string}
 * @param model {object}
 * @param data {object}
 * @returns {object}
 * @private
 */
export function _new (name, model, data = {}) {
  if (!model) {
    throw new Error('Unable to create new entity without model.')
  }
  const Entity = new Model()

  // Build nested models
  _buildNestedModels(Entity, model, data)

  // Set initial entity values
  _setValues(Entity, model, data)

  // Original model
  Object.defineProperty(Entity, 'model', {
    configurable: true,
    enumerable: false,
    writable: true,
    value: model
  })

  // Model name
  Object.defineProperty(Entity, 'modelName', {
    configurable: true,
    enumerable: false,
    writable: false,
    value: name
  })

  // Array with errors
  Object.defineProperty(Entity, 'errors', {
    get () {
      return _checkValidation(Entity)
    }
  })

  // Validation status
  Object.defineProperty(Entity, 'validation', {
    get () {
      return !this.errors.length
    }
  })

  return Entity
}

/**
 * Set entity values
 * @param entity
 * @param model
 * @param data
 * @private
 */
function _setValues (entity, model, data = {}) {
  Object.keys(model).forEach(key => {
    let value

    if (model[key].model) {
      return
    }

    if (!model[key].type) {
      model[key] = {
        type: model[key]
      }
    }

    if (Object.keys(data).includes(key)) {
      // Get value from initial data
      value = data[key]
    } else if (entity[key]) {
      // Leave existing entity value
      value = entity[key]
    } else if (Object.keys(model[key]).includes('default')) {
      // Get value from default option
      value = typeof model[key].default === 'function' ? model[key].default() : model[key].default
    } else {
      // Generate empty value by type
      value = _generateValueByType(model[key])
    }

    if (Object.keys(model[key]).includes('validation')) {
      // Validate value
      if (!model[key].validation(value)) {
        console.warn(`Unable to set "${value}" value. Check model validation.`)
        // Generate empty value by type
        value = entity[key] || _generateValueByType(model[key])
      }
      // Create getter/setter for option
      Object.defineProperty(entity, `_${key}`, {
        configurable: true,
        enumerable: false,
        writable: true,
        value
      })
      Object.defineProperty(entity, key, {
        configurable: true,
        enumerable: true,
        get () {
          return this[`_${key}`]
        },
        set (value) {
          if (!this.model[key].validation(value)) {
            console.warn(`Unable to set "${value}" value. Check model validation.`)
            return this[key]
          }
          this[`_${key}`] = value
        }
      })
    } else {
      entity[key] = value
    }
  })
}

function _buildNestedModels (entity, model, data = {}) {
  Object.keys(model).forEach(key => {
    if (model[key].model) {
      if (LOGS) {
        console.log('Building a nested model', model)
      }

      if (model[key].value) {
        // Creating getter/setter with one visible option
        Object.defineProperty(entity, `_${key}`, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: _new(key, model[key].model, data[key])
        })
        Object.defineProperty(entity, key, {
          configurable: true,
          enumerable: true,
          get () {
            return this[`_${key}`][model[key].value]
          },
          set (value) {
            if (typeof value === 'object') {
              if (LOGS) {
                console.log(`Updating nested entity "${this[`_${key}`].modelName}".`)
              }
              Object.keys(value).forEach(k => {
                console.log('this[`_${key}`][k]', this[`_${key}`][k])
                this[`_${key}`][k] = value[k]
              })
            } else {
              if (LOGS) {
                console.log(`Updating only "${model[key].value}" option of nested entity.`)
              }
              this[`_${key}`][model[key].value] = value
            }
          }
        })
      } else {
        // Creating simple nested entity
        // with getter/setter
        Object.defineProperty(entity, `_${key}`, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: _new(key, model[key].model, data[key])
        })
        Object.defineProperty(entity, key, {
          configurable: true,
          enumerable: model[key].hidden !== true,
          get () {
            return this[`_${key}`]
          },
          set (value) {
            if (typeof value === 'object') {
              Object.keys(value).forEach(k => {
                this[`_${key}`][k] = value[k]
              })
            } else {
              console.warn('Nested entity cannot be updated by not an object.')
            }
          }
        })
      }
    }
  })
}

/**
 * Check entity validation helper
 * @param entity
 * @returns {array}
 * @private
 */
export function _checkValidation (entity) {
  const errors = []
  Object.keys(entity).forEach(key => {
    // Check required options
    if (entity.model[key].required && !entity[key]) {
      errors.push(key)
      return
    }
    // Check nested models validation
    if (entity[`_${key}`] instanceof Model && Object.keys(entity).includes(key)) {
      errors.push(key)
      return
    }
  })
  return errors
}

/**
 * Generate value by option type helper
 * @param option
 * @returns {Object}
 * @private
 */
export function _generateValueByType (option) {
  // eslint-disable-next-line new-cap
  return new option.type().valueOf()
}

export default {
  _require,
  _new,
  _setValues,
  _checkValidation,
  _generateValueByType
}
