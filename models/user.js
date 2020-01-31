// User model
export default {
  name: {
    type: String,
    default: 'Nameless person',
    required: true,
    validation: v => v.length > 1,
    hidden: false
  },
  age: {
    type: Number,
    default: 18,
    required: true,
    validation: v => +v > 0,
    hidden: false
  }
}
