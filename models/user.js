import Department from './department'

// User model
export default {
  id: String,
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
  },
  department: {
    model: Department,
    value: 'title',
    hidden: false
  }
}
