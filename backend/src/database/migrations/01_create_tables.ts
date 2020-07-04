import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('TABLES', table => {
        table.increments('table_id').primary()

        table.integer('restaurant_id')
            .notNullable()
            .references('restaurant_id')
            .inTable('RESTAURANTS')

        table.string('name')
        table.integer('max_people')
        table.string('status').defaultTo('F')
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('TABLES')
}