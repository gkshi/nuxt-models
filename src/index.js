import { _require, _new } from './helpers'

const LOGS = false // process.env.NODE_ENV !== 'production'

const ModelController = {
  /**
   * Get model
   * @param modelName
   * @returns {object}
   */
  get: modelName => {
    if (LOGS) {
      console.log('GET model', modelName)
    }
    return _require(modelName)
  },

  /**
   * Create new model
   * @param name {string, object}
   * @param data {object}
   * @returns {object}
   */
  create: (name, data = {}) => {
    if (LOGS) {
      data
        ? console.log(`CREATE model "${name}" with initial data`, data)
        : console.log(`CREATE model "${name}" without initial data.`)
    }

    const model = typeof name === 'string' ? _require(name) : name
    const modelName = typeof name === 'string' ? name : undefined
    let entity = {}

    try {
      // Creating new entity by model
      entity = _new(modelName, model, data)
    } catch (e) {
      console.warn('Unable to create new entity by invalid model.')
      console.warn(e)
    }

    return entity
  },

  /**
   * Clone existing model
   * @param model
   * @returns {{}}
   */
  clone: (model = {}) => {
    if (!model.modelName) {
      console.warn('Unable to clone model without name.')
      return {}
    }
    return ModelController.create(model.modelName, model)
  }
}

export default ({ app }, inject) => {
  inject('models', ModelController)
}
