/* eslint-disable func-names */
// import * as Knex from "knex";
exports.up = function (knex) {
  return knex.schema
    .createTable('users', t => {
      t.increments('id')
      t.string('email')
        .unique()
        .notNullable()
      t.string('password').notNullable()
      t.timestamps(true, true)
      t.uuid('token')
      t.string('zip')
      t.boolean('isAdmin')
    })
    .createTable('gauges', t => {
      t.increments()
      t.string('name', 255)
        .notNullable()
        .unique()
      t.string('siteCode')
        .notNullable()
        .unique()
      t.jsonb('geoLocation')
    })
    .createTable('connections', t => {
      t.increments()
      t.integer('masterId').notNullable()
      t.string('slaveId').notNullable()
      t.string('type')
      t.timestamps(true, true)
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('gauges')
    .dropTableIfExists('readings')
    .dropTableIfExists('users')
}
