const { Model } = require('objection')
const knex = require('../data/db-config')

Model.knex(knex)

class Connections extends Model {
  static tableName = 'connections'

  static get relationMappings () {
    const Gauges = require('./Gauges')
    const Users = require('./Users')
    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: Users,
        join: {
          from: 'connections.masterId',
          to: 'users.id'
        }
      },
      gauges: {
        relation: Model.HasManyRelation,
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
