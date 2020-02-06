import Image from './image'

// Department model
export default {
  id: String,
  title: {
    type: String,
    required: true
  },
  image: {
    model: Image,
    value: 'path',
    hidden: false
  }
}
