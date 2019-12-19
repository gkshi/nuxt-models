export default {
  name: {
    type: String,
    required: true
  },

  surname: {
    type: String
  },

  age: {
    type: Number,
    validation: value => value >= 0,
    default: 0
  },

  gender: {
    type: String,
    validation: value => ['male', 'female', 'other'].includes(value)
  }
}
