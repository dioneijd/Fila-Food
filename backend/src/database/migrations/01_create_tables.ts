import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('tables', table => {
        table.increments('tab_id').primary();
        table.integer('res_id')
            .notNullable()
            .references('res_id')
            .inTable('restaurants');
        table.integer('number_people')
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('tables');
}