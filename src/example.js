/**
 * Entry point for example page
 */

import { ModelController } from './index.js'

window.ModelController = ModelController
window.Person = ModelController.create('user', { name: 'Jack' })
console.log('Person =', window.Person)
