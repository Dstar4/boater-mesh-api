const { Model } = require('objection')
const knex = require('../data/db-config')
const Connections = require('./Connections')

Model.knex(knex)

class Gauges extends Model {
  static get tableName () {
    return 'gauges'
  }
  static relationMappings = {
    connections: {
      connections: Model.HasManyRelation,
      modelClass: Connections,
      join: {
        from: 'gauges.siteCode',
        to: 'connections.slaveId'
      }
    }
  }
}
module.exports = Gauges
