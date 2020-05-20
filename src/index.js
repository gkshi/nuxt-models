import { _require, _new } from './helpers'

const LOGS = false // process.env.NODE_ENV !== 'production'

export class ModelController {
  /**
   * Get model
   * @param modelName
   * @returns {object}
   */
  get (modelName) {
    if (LOGS) {
      console.log('GET model', modelName)
    }
    return _require(modelName)
  }

  /**
   * Create new model
   * @param name {string, object}
   * @param data {object}
   * @returns {object}
   */
  create (name, data = {}) {
    if (LOGS) {
      Object.keys(data).length
        ? console.log(`Creating an Entity by "${name}" model with initial data`, data)
        : console.log(`Creating an Entity by "${name}" model without initial data.`)
    }

    const model = typeof name === 'string' ? _require(name) : name
    const modelName = typeof name === 'string' ? name : undefined
    let entity = {}

    try {
      // Creating new entity by model
      entity = _new(modelName, model, data)
    } catch (e) {
      throw new Error(e)
    }

    return entity
  }

  /**
   * Clone existing model
   * @param model
   * @returns {{}}
   */
  clone (model = {}) {
    return ModelController.create(model.modelName, model)
  }
}

export default (context, inject) => {
  inject('models', new ModelController())
}
