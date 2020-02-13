const { Model } = require('objection')
const knex = require('../data/db-config')

Model.knex(knex)

class Gauges extends Model {
  static get tableName () {
    return 'gauges'
  }
  static get relationMappings () {
    const Connections = require('./Connections')
    return {
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