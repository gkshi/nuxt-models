<template lang="pug">
  .page.index
    .wrapper
      h1 {{ app.name }}
      div {{ app.description }}

      section
        h2 Installation
        div
          div 1. Install plugin via npm or yarn
          div
            pre.code
              code yarn add --dev nuxt-models

          div 2. Include plugin in nuxt.config.js
          div
            pre.code
              code {{ code.nuxtConfig }}

      section
        h2 Basic usage
        div
          div 1. Describe a model. Create /models/person.js
          div
            pre.code
              code {{ code.modelPerson }}

          div 2. Create an entity in Vue-component
          div
            pre.code
              code {{ code.createModel }}

      section
        h2 Model describing
        div
          .block
            div Model is an object with described options. There is a simple model example:
            div
              pre.code
                code {{ code.simpleModel }}
          .block
            div
              .label Option.type
            div
              div Defines an option type
              div String, Number, Array, Object, Boolean
          .block
            div
              .label Option.default
            div Default option value, when entity creates.
          .block
            div
              .label Option.required
            div true/false state. If it's true, Entity.validation will return false if there is no value.
          .block
            div
              .label Option.hidden
            div true/false state. If it's true, Entity.values method won't include this option to return.
          .block
            div
              .label Option.validation
            div
              div a function. Describes condition for correct option value.
              div if all validation rules of options return true, Entity.validation returns true.

      section
        h2 Plugin methods
        div
          .block
            div
              .label this.$models.create
            div creates an entity by described model
            div
              pre.code
                code {{ code.createModel }}
          .block
            div
              .label this.$models.get
            div returns a model
            div
              pre.code
                code {{ code.getModel }}
          .block
            div
              .label this.$models.clone
            div Creates a copy of existing entity with all values
            div
              pre.code
                code {{ code.copyModel }}

      section
        h2 Entity methods
        div
          .block
            div
              .label Entity.modelName
            div returns a model name, entity was created by
            div
              pre.code
                code {{ code.modelName }}
          .block
            div
              .label Entity.model
            div returns a model, entity was created by
            div
              pre.code
                code {{ code.getEntityModel }}
          .block
            div
              .label Entity.validation
            div
              div returns true/false state.
              div if it's true, all entity values are correct.
              div if it's false, some of entity values hasn't passed validation.
              div values without validation returns true in any case.
            div
              pre.code
                code {{ code.validation }}
          .block
            div
              .label Entity.values
            div
              div returns an object with all options and values.
              div Options with hidden property won't be included in object.
</template>

<script>
import app from '@/package.json'

export default {
  name: 'index-page',
  data () {
    return {
      app,
      person: this.$models.create('person'),
      code: {
        nuxtConfig: `export default {
  plugins: [
    'nuxt-models'
  ]
}`,
        modelPerson: `export default {
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
}`,
        createModel: `const Person = this.$models.get('person', {
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
`,
        getModel: `const PersonModel = this.$models.get('person')

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
`,
        copyModel: `const Person = this.$models.create('person', { name: 'Jack'} )
const AnotherPerson = this.$models.clone(Person)

console.log(Person.name) // Jack
console.log(AnotherPerson.name) // Jack

AnotherPerson.name = 'Mary'

console.log(Person.name) // Jack
console.log(AnotherPerson.name) // Mary`,
        modelName: `const Person = this.$models.create('person')

console.log(Person.modelName) // person`,
        getEntityModel: `const Person = this.$models.create('person')

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
// }`,
        validation: `const Person = this.$models.create('person')

console.log(Person.validation)
// return false
// because "gender" value hasn't passed validation

Person.gender = 'male'

console.log(Person.validation)
// return true
// all values have passed validation`,
        simpleModel: `// Simple person model with name only
export default {
  name: {
    type: String,
    default: 'Jack',
    required: true,
    hidden: false,
    validation: value => value.length > 1
  }
}
`
      }
    }
  },
  mounted () {
    console.log(this.person)
  }
}
</script>

<style lang="scss" scoped>
  .index {
    section {
      margin: 80px 0;
    }
    .block {
      margin: 40px 0;
    }
  }
</style>
