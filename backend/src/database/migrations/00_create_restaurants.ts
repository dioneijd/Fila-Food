import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('RESTAURANTS', table => {
        table.increments('idRestaurant').primary()
        table.string('email').notNullable()
        table.string('password').notNullable()
        table.string('name').notNullable()
        table.string('thumbnail')
        table.integer('maxWaitTime').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('RESTAURANTS')
}