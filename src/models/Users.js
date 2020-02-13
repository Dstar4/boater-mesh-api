const { Model } = require('objection')
const knex = require('../data/db-config')

Model.knex(knex)

class User extends Model {
  static tableName = 'users'

  static get relationMappings () {
    const Connections = require('./Connections')
    return {
      connections: {
        relation: Model.HasManyRelation,
        modelClass: Connections,
        join: {
          from: 'users.id',
          to: 'connections.masterId'
        }
      }
    }
  }
  static jsonSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      id: { type: 'integer' },
      email: { type: 'string', minLength: 4, maxLength: 255 },
      password: { type: 'string', minLength: 4, maxLength: 255 },
      token: { type: 'string', minLength: 1, maxLength: 255 },
      zip: { type: 'boolean' },
      isAdmin: { type: 'boolean' }
    }
  }
}
module.exports = User
