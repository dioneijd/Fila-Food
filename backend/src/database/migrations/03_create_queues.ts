import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('QUEUES', table => {
        table.increments('queue_id').primary()

        table.integer('restaurant_id')
            .notNullable()
            .references('restaurant_id')
            .inTable('RESTAURANTS')

        table.integer('customer_id')
            .notNullable()
            .references('customer_id')
            .inTable('CUSTOMERS')
        
        table.integer('number_people')
        table.timestamp('reg_time').defaultTo(knex.fn.now())
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('QUEUES')
}