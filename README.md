# nuxt-models

> JS model controller for your Nuxt.js project.

Plugin use cases:
* Keep common data standart.
* Complement incomplete data getting by API.
* Control data validity.

&nbsp;

### Installation

1. Install plugin via npm or yarn  

```yarn add --dev nuxt-models```

2. Include plugin in nuxt.config.js

```javascript
export default {
  plugins: [
    'nuxt-models'
  ]
}
```


&nbsp;


### Basic usage

1. Describe a model. Create /models/person.js

```javascript
export default {
  name: String,
  surname: String,
  age: {
    type: Number,
    validation: value => value > 0
  },
  gender: {
    type: String,
    validation: value => ['male', 'female', 'other'].includes(value)
  }
}
```

2. Create an entity in Vue-component

```javascript
const Person = this.$models.create('person', {
  name: 'Jack',
  age: 25
})

// returns an entity
// {
//   name: 'Jack',
//   surname: '',
//   age: 25,
//   gender: ''
// }
```


&nbsp;


### Model describing

Model is an object with described options. There is a simple model example:

```javascript
// Simple person model with name only
export default {
  name: {
    type: String,
    default: 'Jack',
    required: true,
    hidden: false,
    validation: value => value.length > 1
  }
}
```

`Option.type`  
Defines an option type  
String, Number, Array, Object, Boolean

`Option.default`  
Default option value, when entity creates.

`Option.required`  
True/false state. If it's true, Entity.validation will return false if there is no value.

`Option.hidden`  
True/false state. If it's true, Entity.values method won't include this option to return.

`Option.validation`  
A function. Describes condition for correct option value.  
If all validation rules of options return true, Entity.validation returns true.


&nbsp;


### Nested models

You may create entities with nested entities.

```javascript
import Department from '@/models/department'

// Person model
export default {
  name: String,
  age: Number,
  department: {
    model: Department,
    value: 'title',
    hidden: false
  }
}
```

`Option.model`  
Option with nested model.

`Option.value`  
Option name of nested model. Entity.department will return its value.  
Cannot be combined with "hidden" option.

`Option.hidden`  
True/false state. If it's true, Entity.department will be added as hidden property.  
Cannot be combined with "value" option.

&nbsp;  


### Plugin methods

`this.$models.create`  
Creates an entity by described model

```javascript
const Person = this.$models.create('person', {
  name: 'Jack',
  age: 25
})

// returns an entity
// {
//   name: 'Jack',
//   surname: '',
//   age: 25,
//   gender: ''
// }
```
&nbsp;

`this.$models.get`  
Returns a model object

```javascript
const PersonModel = this.$models.get('person')

// returns a model
// {
//   name: {
//     type: String,
//     required: true
//   },
//   surname: {
//     type: String
//   },
//   age: {
//     type: Number,
//     validation: value => value >= 0,
//     default: 0
//   },
//   gender: {
//     type: String,
//     validation: value => ['male', 'female', 'other'].includes(value)
//   }
// }
```
&nbsp;

`this.$models.clone`  
Creates a copy of existing entity with all values

```javascript
const Person = this.$models.create('person', { name: 'Jack'} )
const AnotherPerson = this.$models.clone(Person)

console.log(Person.name) // Jack
console.log(AnotherPerson.name) // Jack

AnotherPerson.name = 'Mary'

console.log(Person.name) // Jack
console.log(AnotherPerson.name) // Mary
```


&nbsp;


### Entity methods

`Entity.modelName`  
Returns a model name, entity was created by

```javascript
const Person = this.$models.create('person')

console.log(Person.modelName) // person
```
&nbsp;

`Entity.model`  
Returns a model, entity was created by

```javascript
const Person = this.$models.create('person')

console.log(Person.model)

// returns a model
// {
//   name: {
//     type: String,
//     required: true
//   },
//   surname: {
//     type: String
//   },
//   age: {
//     type: Number,
//     validation: value => value >= 0,
//     default: 0
//   },
//   gender: {
//     type: String,
//     validation: value => ['male', 'female', 'other'].includes(value)
//   }
// }
```
&nbsp;

`Entity.validation`  
Returns true/false state.  
If it's true, all entity values are correct.  
If it's false, some of entity values hasn't passed validation.  
Values without validation returns true in any case.

```javascript
const Person = this.$models.create('person')

console.log(Person.validation)
// return false
// because "gender" value hasn't passed validation

Person.gender = 'male'

console.log(Person.validation)
// return true
// all values have passed validation
```
&nbsp;

`Entity.values`  
Returns an object with all options and values.  
Options with hidden property won't be included in object.
