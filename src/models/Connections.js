const { Model } = require('objection')
const knex = require('../data/db-config')

Model.knex(knex)

class Connections extends Model {
  static get tableName () {
    return 'connections'
  }
  static get relationMappings () {
    const Gauges = require('./Gauges')
    const Users = require('./Users')
    return {
      users: {
        connections: Model.HasOneRelation,
        modelClass: Users,
        join: {
          from: 'connections.masterId',
          to: 'users.id'
        }
      },
      gauges: {
        connections: Model.HasManyRelation,
        modelClass: Gauges,
        join: {
          from: 'connections.slaveId',
          to: 'gauges.siteCode'
        }
      }
    }
  }
}
module.exports = Connections
